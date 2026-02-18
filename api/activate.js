// api/activate.js - 결제 완료 후 서명된 프리미엄 토큰 발급
import crypto from 'crypto';

const BASE_URL = 'https://content-splitter.vercel.app';
const TOKEN_COOKIE_MAX_AGE = 400 * 24 * 60 * 60; // 400일 (연간 구독 커버)

// HMAC 서명 프리미엄 토큰 생성
function generatePremiumToken(userId, plan) {
  const days = plan === 'annual' ? 370 : 35;
  const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ userId, expiry, plan })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', process.env.PREMIUM_TOKEN_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

export default async function handler(req, res) {
  const { order_id } = req.query;

  if (!order_id) {
    return res.redirect(302, `${BASE_URL}/?error=missing_order`);
  }

  try {
    // LemonSqueezy API로 주문 정보 검증
    const orderRes = await fetch(`https://api.lemonsqueezy.com/v1/orders/${order_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });

    if (!orderRes.ok) {
      throw new Error(`LemonSqueezy API error: ${orderRes.status}`);
    }

    const orderData = await orderRes.json();
    const attrs = orderData.data.attributes;

    // 결제 상태 확인
    if (attrs.status !== 'paid') {
      return res.redirect(302, `${BASE_URL}/?error=order_not_paid`);
    }

    const userId = attrs.custom_data?.user_id || 'unknown';

    // 연간/월간 구분 (variant ID로 판별)
    const variantId = String(attrs.first_order_item?.variant_id || '');
    const plan = variantId === String(process.env.LEMON_SQUEEZY_VARIANT_ID_ANNUAL)
      ? 'annual'
      : 'monthly';

    const token = generatePremiumToken(userId, plan);

    // 서명된 토큰을 쿠키로 설정 후 메인 페이지로 리다이렉트
    res.setHeader(
      'Set-Cookie',
      `premium_code=${token}; Path=/; Max-Age=${TOKEN_COOKIE_MAX_AGE}; SameSite=Strict; Secure`
    );
    return res.redirect(302, `${BASE_URL}/?premium=activated`);

  } catch (error) {
    console.error('Activation error:', error);
    return res.redirect(302, `${BASE_URL}/?error=activation_failed`);
  }
}
