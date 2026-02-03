// api/webhook.js - LemonSqueezy Webhook 처리

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Webhook 서명 검증
    const signature = req.headers['x-signature'];
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = hmac.update(JSON.stringify(req.body)).digest('hex');

      if (digest !== signature) {
        console.error('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const event = req.body;
    const eventName = event.meta?.event_name;

    console.log('LemonSqueezy Webhook:', eventName);

    // 이벤트 타입별 처리
    switch (eventName) {
      case 'order_created':
        // 일회성 구매
        console.log('Order created:', event.data.attributes);
        break;

      case 'subscription_created':
        // 구독 생성
        const subscription = event.data.attributes;
        console.log('Subscription created:', {
          id: event.data.id,
          email: subscription.user_email,
          status: subscription.status,
          variantId: subscription.variant_id
        });
        
        // 여기서 데이터베이스 업데이트 (추후 구현)
        // await updateUserSubscription(subscription.user_email, 'premium');
        break;

      case 'subscription_updated':
        // 구독 업데이트 (플랜 변경, 갱신 등)
        console.log('Subscription updated:', event.data.attributes);
        break;

      case 'subscription_cancelled':
        // 구독 취소
        console.log('Subscription cancelled:', event.data.attributes);
        // await updateUserSubscription(email, 'free');
        break;

      case 'subscription_resumed':
        // 구독 재개
        console.log('Subscription resumed:', event.data.attributes);
        break;

      case 'subscription_expired':
        // 구독 만료
        console.log('Subscription expired:', event.data.attributes);
        break;

      case 'subscription_paused':
        // 구독 일시정지
        console.log('Subscription paused:', event.data.attributes);
        break;

      case 'subscription_unpaused':
        // 구독 재개
        console.log('Subscription unpaused:', event.data.attributes);
        break;

      case 'subscription_payment_failed':
        // 결제 실패
        console.log('Payment failed:', event.data.attributes);
        break;

      case 'subscription_payment_success':
        // 결제 성공
        console.log('Payment success:', event.data.attributes);
        break;

      case 'subscription_payment_recovered':
        // 결제 복구 (재시도 성공)
        console.log('Payment recovered:', event.data.attributes);
        break;

      default:
        console.log('Unknown event:', eventName);
    }

    // Webhook 수신 확인
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
}