// api/webhook.js - Lemon Squeezy Webhook 처리

const crypto = require('crypto');

module.exports = async (req, res) => {
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

      if (signature !== digest) {
        console.error('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const event = req.body;
    const eventName = event.meta?.event_name;

    console.log(`Webhook received: ${eventName}`);

    // 이벤트 타입별 처리
    switch (eventName) {
      case 'order_created':
        // 주문 생성 (일회성 구매)
        await handleOrderCreated(event);
        break;

      case 'subscription_created':
        // 구독 시작
        await handleSubscriptionCreated(event);
        break;

      case 'subscription_updated':
        // 구독 업데이트 (플랜 변경 등)
        await handleSubscriptionUpdated(event);
        break;

      case 'subscription_cancelled':
        // 구독 취소
        await handleSubscriptionCancelled(event);
        break;

      case 'subscription_resumed':
        // 구독 재개
        await handleSubscriptionResumed(event);
        break;

      case 'subscription_expired':
        // 구독 만료
        await handleSubscriptionExpired(event);
        break;

      case 'subscription_paused':
        // 구독 일시정지
        await handleSubscriptionPaused(event);
        break;

      case 'subscription_unpaused':
        // 구독 재개
        await handleSubscriptionUnpaused(event);
        break;

      case 'subscription_payment_success':
        // 결제 성공
        await handlePaymentSuccess(event);
        break;

      case 'subscription_payment_failed':
        // 결제 실패
        await handlePaymentFailed(event);
        break;

      default:
        console.log(`Unhandled event type: ${eventName}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// 구독 생성 처리
async function handleSubscriptionCreated(event) {
  const data = event.data;
  const customData = data.attributes.first_subscription_item?.custom_data;
  
  console.log('Subscription created:', {
    subscriptionId: data.id,
    customerId: data.attributes.customer_id,
    status: data.attributes.status,
    userId: customData?.user_id
  });

  // 실제 운영에서는 데이터베이스에 저장
  // 예: await database.createSubscription({ ... })
}

// 구독 업데이트 처리
async function handleSubscriptionUpdated(event) {
  const data = event.data;
  
  console.log('Subscription updated:', {
    subscriptionId: data.id,
    status: data.attributes.status
  });

  // 데이터베이스 업데이트
}

// 구독 취소 처리
async function handleSubscriptionCancelled(event) {
  const data = event.data;
  
  console.log('Subscription cancelled:', {
    subscriptionId: data.id,
    endsAt: data.attributes.ends_at
  });

  // 사용자에게 이메일 발송 등
}

// 구독 만료 처리
async function handleSubscriptionExpired(event) {
  const data = event.data;
  
  console.log('Subscription expired:', {
    subscriptionId: data.id
  });

  // 프리미엄 권한 제거
  // await database.deactivatePremium(userId)
}

// 결제 성공 처리
async function handlePaymentSuccess(event) {
  const data = event.data;
  
  console.log('Payment success:', {
    subscriptionId: data.id,
    amount: data.attributes.total_formatted
  });
}

// 결제 실패 처리
async function handlePaymentFailed(event) {
  const data = event.data;
  
  console.log('Payment failed:', {
    subscriptionId: data.id
  });

  // 사용자에게 결제 실패 알림
}

// 주문 생성 처리 (일회성)
async function handleOrderCreated(event) {
  const data = event.data;
  
  console.log('Order created:', {
    orderId: data.id,
    total: data.attributes.total_formatted
  });
}

// 구독 재개
async function handleSubscriptionResumed(event) {
  const data = event.data;
  console.log('Subscription resumed:', data.id);
}

// 구독 일시정지
async function handleSubscriptionPaused(event) {
  const data = event.data;
  console.log('Subscription paused:', data.id);
}

// 구독 정지 해제
async function handleSubscriptionUnpaused(event) {
  const data = event.data;
  console.log('Subscription unpaused:', data.id);
}
