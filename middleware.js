// Vercel Edge Middleware - Accept-Language 기반 언어 자동 감지 및 리다이렉트
// 첫 방문자에게만 적용: ?lang 파라미터나 language 쿠키가 없을 때만 리다이렉트

export const config = {
  matcher: ['/'],
};

export default function middleware(req) {
  const url = new URL(req.url);

  // ?lang= 파라미터가 이미 있으면 그대로 통과
  if (url.searchParams.has('lang')) return;

  // language 쿠키가 있으면 통과 (이미 언어를 선택한 사용자)
  const cookie = req.headers.get('cookie') || '';
  const hasLangCookie = cookie.split(';').some(c => c.trim().startsWith('language='));
  if (hasLangCookie) return;

  // Accept-Language 헤더로 언어 감지
  const acceptLang = req.headers.get('accept-language') || '';
  const primaryLang = acceptLang.split(',')[0].split('-')[0].toLowerCase().trim();

  // 영어는 기본값이므로 리다이렉트 불필요, ko/ja/es/zh만 리다이렉트
  const redirectLangs = ['ko', 'ja', 'es', 'zh'];
  if (!redirectLangs.includes(primaryLang)) return;

  url.searchParams.set('lang', primaryLang);
  return Response.redirect(url.toString(), 302);
}
