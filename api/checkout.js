// api/checkout.js - LemonSqueezy 결제 페이지 생성

export default async function handler(req, res) {
    // CORS 설정
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://content-splitter.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { plan = 'monthly', email } = req.body;
  
      // Variant ID 선택
      const variantId = plan === 'annual' 
        ? process.env.LEMON_SQUEEZY_VARIANT_ID_ANNUAL
        : process.env.LEMON_SQUEEZY_VARIANT_ID_MONTHLY;
  
      // LemonSqueezy API로 체크아웃 생성
      const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
        },
        body: JSON.stringify({
          data: {
            type: 'checkouts',
            attributes: {
              checkout_data: {
                email: email || undefined,
                custom: {
                  user_id: req.body.userId || 'anonymous'
                }
              }
            },
            relationships: {
              store: {
                data: {
                  type: 'stores',
                  id: process.env.LEMON_SQUEEZY_STORE_ID
                }
              },
              variant: {
                data: {
                  type: 'variants',
                  id: variantId
                }
              }
            }
          }
        })
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('LemonSqueezy Error:', error);
        throw new Error('Failed to create checkout');
      }
  
      const data = await response.json();
      const checkoutUrl = data.data.attributes.url;
  
      return res.status(200).json({
        success: true,
        checkoutUrl: checkoutUrl
      });
  
    } catch (error) {
      console.error('Checkout error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }