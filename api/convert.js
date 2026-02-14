// Vercel Serverless Function
import Anthropic from '@anthropic-ai/sdk';

// Anthropic 클라이언트 생성
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// IP 기반 Rate Limiting (메모리 기반 - serverless 인스턴스별)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1분
const RATE_LIMIT_MAX = 5; // 1분당 최대 5회

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { timestamp: now, count: 1 });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// 오래된 레코드 정리 (메모리 누수 방지)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW * 2);

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://content-splitter.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate Limiting 체크
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'TOO_MANY_REQUESTS'
    });
  }

  try {
    const { content, platforms, tone = 'professional', hashtagCount = 10 } = req.body;

    // 입력 검증
    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_INPUT'
      });
    }

    // 콘텐츠 길이 검증
    if (typeof content !== 'string' || content.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'CONTENT_TOO_LONG'
      });
    }

    // 플랫폼 화이트리스트 검증
    const allowedPlatforms = ['instagram', 'twitter', 'linkedin', 'facebook'];
    if (!Array.isArray(platforms) || platforms.some(p => !allowedPlatforms.includes(p))) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_PLATFORM'
      });
    }

    // 톤 화이트리스트 검증
    const allowedTones = ['professional', 'friendly', 'casual', 'enthusiastic'];
    if (!allowedTones.includes(tone)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_TONE'
      });
    }

    // 해시태그 수 검증
    const safeHashtagCount = Math.max(0, Math.min(30, parseInt(hashtagCount) || 10));

    // 톤앤매너 설명
    const toneDescriptions = {
      professional: '전문적이고 격식있는',
      friendly: '친근하고 따뜻한',
      casual: '편안하고 자연스러운',
      enthusiastic: '열정적이고 에너지 넘치는'
    };

    const toneDesc = toneDescriptions[tone] || toneDescriptions.professional;

    // Claude API 호출
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Convert the following content for ${platforms.join(', ')} platforms.

Write in ${toneDesc} tone.

Platform requirements:
- instagram: Emotional with ${safeHashtagCount} hashtags (max 2200 chars)
- twitter: Concise and impactful (max 280 chars, use thread if needed)
- linkedin: Professional and insight-focused (max 3000 chars)
- facebook: Friendly and storytelling (recommended under 2000 chars)

Original content:
${content}

IMPORTANT: Respond in the SAME LANGUAGE as the original content.
If the content is in English, respond in English.
If the content is in Korean, respond in Korean.

Response format (JSON only):
{
  "instagram": "converted post (if selected)",
  "twitter": "converted post (if selected)",
  "linkedin": "converted post (if selected)",
  "facebook": "converted post (if selected)"
}

Only include selected platforms. Return JSON only, no explanations.`
      }]
    });

    // 응답 텍스트 추출
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    // JSON 파싱
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const results = JSON.parse(cleanedText);

    // 성공 응답
    res.status(200).json({
      success: true,
      results: results
    });

  } catch (error) {
    console.error('변환 중 오류:', error);
    
    res.status(500).json({
      success: false,
      error: 'CONVERSION_FAILED'
    });
  }
}