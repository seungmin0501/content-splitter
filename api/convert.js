// Vercel Serverless Function
const Anthropic = require('@anthropic-ai/sdk');

// Anthropic 클라이언트 생성
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = async (req, res) => {
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

  try {
    const { content, platforms, tone = 'professional', hashtagCount = 10 } = req.body;

    // 입력 검증
    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({
        success: false,
        error: '콘텐츠와 플랫폼을 입력해주세요.'
      });
    }

    // 콘텐츠 길이 검증
    if (typeof content !== 'string' || content.length > 10000) {
      return res.status(400).json({
        success: false,
        error: '콘텐츠는 10,000자 이하로 입력해주세요.'
      });
    }

    // 플랫폼 화이트리스트 검증
    const allowedPlatforms = ['instagram', 'twitter', 'linkedin', 'facebook'];
    if (!Array.isArray(platforms) || platforms.some(p => !allowedPlatforms.includes(p))) {
      return res.status(400).json({
        success: false,
        error: '유효하지 않은 플랫폼입니다.'
      });
    }

    // 톤 화이트리스트 검증
    const allowedTones = ['professional', 'friendly', 'casual', 'enthusiastic'];
    if (!allowedTones.includes(tone)) {
      return res.status(400).json({
        success: false,
        error: '유효하지 않은 톤입니다.'
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
      error: '변환 중 오류가 발생했습니다.'
    });
  }
};