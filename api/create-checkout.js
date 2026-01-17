// api/create-checkout.js - Lemon Squeezy Checkout 세션 생성

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { variantId, email } = req.body;

    if (!variantId) {
      return res.status(400).json({ 
        success: false,
        error: 'Variant ID is required' 
      });
    }

    // Lemon Squeezy API 호출
    const checkoutData = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: email || undefined,
            custom: {
              user_id: generateUserId() // 간단한 사용자 추적용
            }
          }
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: '274107'
            }
          },
          variant: {
            data: {
              type: 'variants',
              id: variantId.toString()
            }
          }
        }
      }
    };

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
      },
      body: JSON.stringify(checkoutData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Lemon Squeezy API Error:', data);
      throw new Error(data.errors?.[0]?.detail || 'Checkout creation failed');
    }

    const checkoutUrl = data.data.attributes.url;

    res.status(200).json({
      success: true,
      checkoutUrl: checkoutUrl
    });

  } catch (error) {
    console.error('Create checkout error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create checkout'
    });
  }
};

// 간단한 사용자 ID 생성 (쿠키/로컬스토리지용)
function generateUserId() {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}
