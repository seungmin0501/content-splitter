// Vercel Serverless Function
const Anthropic = require('@anthropic-ai/sdk');

// Anthropic 클라이언트 생성
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
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

    console.log(`변환 요청: ${platforms.join(', ')}, 톤: ${tone}, 해시태그: ${hashtagCount}개`);

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
        content: `다음 콘텐츠를 ${platforms.join(', ')} 플랫폼에 맞게 변환해주세요.

톤앤매너: ${toneDesc} 스타일로 작성해주세요.

각 플랫폼의 특성에 맞게:
- instagram: 감성적이고 해시태그 ${hashtagCount}개 포함 (최대 2200자)
- twitter: 간결하고 임팩트 있게 (최대 280자, 필요시 스레드로)
- linkedin: 전문적이고 인사이트 중심 (최대 3000자)
- facebook: 친근하고 스토리텔링 중심 (최대 63,206자, 하지만 2000자 이내 추천)

원본 콘텐츠:
${content}

응답은 반드시 다음 JSON 형식으로만 작성해주세요:
{
  "instagram": "변환된 인스타그램 포스트 (선택된 경우)",
  "twitter": "변환된 트위터 포스트 (선택된 경우)",
  "linkedin": "변환된 링크드인 포스트 (선택된 경우)",
  "facebook": "변환된 페이스북 포스트 (선택된 경우)"
}

선택된 플랫폼만 포함하고, JSON만 반환해주세요. 다른 설명은 넣지 마세요.`
      }]
    });

    // 응답 텍스트 추출
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    console.log('Claude 응답 받음');

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
      error: '변환 중 오류가 발생했습니다.',
      details: error.message
    });
  }
};