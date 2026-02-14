const translations = {
  ko: {
    // Meta
    metaDescription: "블로그 글 하나를 30초 만에 인스타그램, 트위터, 링크드인, 페이스북에 최적화된 SNS 포스트로 변환. 무료 AI 콘텐츠 변환 도구.",

    // 헤더
    title: "✨ ContentSplitter",
    subtitle: "긴 글 하나를 여러 SNS 포스트로 자동 변환",
    
    // 입력 섹션
    inputTitle: "원본 콘텐츠 입력",
    exampleBtn: "💡 예시 보기",
    placeholder: "블로그 포스트, 유튜브 스크립트 등을 여기에 붙여넣으세요...",
    charCount: "자",
    
    // 플랫폼
    platformTitle: "변환할 플랫폼 선택:",
    platforms: {
      instagram: "📸 인스타그램",
      twitter: "🐦 트위터",
      linkedin: "💼 링크드인",
      facebook: "👍 페이스북"
    },
    
    // 톤앤매너
    toneTitle: "톤앤매너 선택:",
    tones: {
      professional: "🎩 전문적",
      friendly: "😊 친근함",
      casual: "✌️ 캐주얼",
      enthusiastic: "🔥 열정적"
    },
    
    // 옵션
    hashtagTitle: "해시태그 개수 (인스타그램):",
    hashtagCount: "개",
    
    // 버튼
    convertBtn: "🚀 SNS 포스트로 변환하기",
    shareBtn: "🔗 결과 공유하기",
    copyBtn: "📋 복사하기",
    copiedBtn: "✅ 복사됨!",
    upgradeBtn: "⭐ 프리미엄으로 업그레이드",
    
    // 로딩
    loadingMessages: [
      "AI가 콘텐츠를 분석하고 있어요...",
      "완벽한 SNS 포스트를 만들고 있어요...",
      "톤앤매너를 조정하는 중...",
      "해시태그를 최적화하는 중...",
      "각 플랫폼에 맞게 변환하는 중...",
      "마지막 손질을 하고 있어요..."
    ],
    
    // 결과
    resultsTitle: "✅ 변환 완료!",
    charInfo: "자",
    overLimit: "(⚠️ 제한 초과!)",
    
    // 알림
    alerts: {
      noContent: "콘텐츠를 입력해주세요!",
      tooShort: "최소 50자 이상 입력해주세요. 더 긴 내용을 입력하면 더 좋은 결과를 얻을 수 있어요!",
      noPlatform: "최소 하나의 플랫폼을 선택해주세요!",
      error: "변환 중 오류가 발생했습니다. 다시 시도해주세요.\n\n오류: ",
      shareSuccess: "링크가 복사되었습니다! 친구들에게 공유해보세요! 🎉",
      limitReached: "오늘의 무료 변환 횟수를 모두 사용했습니다.\n프리미엄으로 업그레이드하시겠어요?",
      usageCount: "오늘 무료 변환 {current}/{total}회 사용",
      checkoutError: "결제 페이지 생성 중 오류가 발생했습니다. 다시 시도해주세요."
    },
    
    // 푸터
    footer: "Made with ❤️ by 승민",
    version: "v2.0 - 글로벌 베타",
    
    // 쿠키 배너
    cookieMessage: "🍪 이 사이트는 사용 횟수 추적과 사용자 경험 개선을 위해 쿠키를 사용합니다. 개인 식별 정보는 수집하지 않습니다.",
    cookieAccept: "동의"
  },
  
  en: {
    metaDescription: "Turn one blog post into 10 platform-optimized social media posts in 30 seconds. Free AI tool for Twitter, LinkedIn, Instagram, and Facebook.",

    title: "✨ ContentSplitter",
    subtitle: "Transform long content into social media posts automatically",
    
    inputTitle: "Enter Your Content",
    exampleBtn: "💡 See Example",
    placeholder: "Paste your blog post, YouTube script, or any long-form content here...",
    charCount: "chars",
    
    platformTitle: "Select Platforms:",
    platforms: {
      instagram: "📸 Instagram",
      twitter: "🐦 Twitter",
      linkedin: "💼 LinkedIn",
      facebook: "👍 Facebook"
    },
    
    toneTitle: "Select Tone:",
    tones: {
      professional: "🎩 Professional",
      friendly: "😊 Friendly",
      casual: "✌️ Casual",
      enthusiastic: "🔥 Enthusiastic"
    },
    
    hashtagTitle: "Hashtag Count (Instagram):",
    hashtagCount: "",
    
    convertBtn: "🚀 Convert to Social Posts",
    shareBtn: "🔗 Share Results",
    copyBtn: "📋 Copy",
    copiedBtn: "✅ Copied!",
    upgradeBtn: "⭐ Upgrade to Premium",
    
    loadingMessages: [
      "AI is analyzing your content...",
      "Creating perfect social media posts...",
      "Adjusting tone and style...",
      "Optimizing hashtags...",
      "Converting for each platform...",
      "Adding final touches..."
    ],
    
    resultsTitle: "✅ Conversion Complete!",
    charInfo: "chars",
    overLimit: "(⚠️ Over Limit!)",
    
    alerts: {
      noContent: "Please enter your content!",
      tooShort: "Please enter at least 50 characters for better results!",
      noPlatform: "Please select at least one platform!",
      error: "An error occurred during conversion. Please try again.\n\nError: ",
      shareSuccess: "Link copied! Share it with your friends! 🎉",
      limitReached: "You've used all your free conversions for today.\nWould you like to upgrade to Premium?",
      usageCount: "Free conversions: {current}/{total} used today",
      checkoutError: "An error occurred while creating the checkout page. Please try again."
    },
    
    footer: "Made with ❤️ by Seungmin",
    version: "v2.0 - Global Beta",
    
    cookieMessage: "🍪 This site uses cookies to track usage and improve user experience. We don't collect personal identification information.",
    cookieAccept: "Accept"
  },
  
  ja: {
    metaDescription: "ブログ記事1つを30秒でInstagram、Twitter、LinkedIn、Facebook向けのSNS投稿に変換。無料AIコンテンツ変換ツール。",

    title: "✨ ContentSplitter",
    subtitle: "長文を自動的にSNS投稿に変換",
    
    inputTitle: "コンテンツを入力",
    exampleBtn: "💡 例を見る",
    placeholder: "ブログ投稿、YouTubeスクリプトなど、長文コンテンツをここに貼り付けてください...",
    charCount: "文字",
    
    platformTitle: "プラットフォームを選択:",
    platforms: {
      instagram: "📸 インスタグラム",
      twitter: "🐦 ツイッター",
      linkedin: "💼 リンクトイン",
      facebook: "👍 フェイスブック"
    },
    
    toneTitle: "トーンを選択:",
    tones: {
      professional: "🎩 プロフェッショナル",
      friendly: "😊 フレンドリー",
      casual: "✌️ カジュアル",
      enthusiastic: "🔥 情熱的"
    },
    
    hashtagTitle: "ハッシュタグ数 (インスタグラム):",
    hashtagCount: "個",
    
    convertBtn: "🚀 SNS投稿に変換",
    shareBtn: "🔗 結果を共有",
    copyBtn: "📋 コピー",
    copiedBtn: "✅ コピーしました!",
    upgradeBtn: "⭐ プレミアムにアップグレード",
    
    loadingMessages: [
      "AIがコンテンツを分析しています...",
      "完璧なSNS投稿を作成しています...",
      "トーンとスタイルを調整中...",
      "ハッシュタグを最適化中...",
      "各プラットフォーム用に変換中...",
      "最後の仕上げをしています..."
    ],
    
    resultsTitle: "✅ 変換完了!",
    charInfo: "文字",
    overLimit: "(⚠️ 制限超過!)",
    
    alerts: {
      noContent: "コンテンツを入力してください!",
      tooShort: "より良い結果を得るために、少なくとも50文字を入力してください!",
      noPlatform: "少なくとも1つのプラットフォームを選択してください!",
      error: "変換中にエラーが発生しました。もう一度お試しください。\n\nエラー: ",
      shareSuccess: "リンクがコピーされました! 友達と共有しましょう! 🎉",
      limitReached: "今日の無料変換回数を使い切りました。\nプレミアムにアップグレードしますか?",
      usageCount: "無料変換: 今日{current}/{total}回使用",
      checkoutError: "決済ページの作成中にエラーが発生しました。もう一度お試しください。"
    },
    
    footer: "Made with ❤️ by Seungmin",
    version: "v2.0 - グローバルベータ",
    
    cookieMessage: "🍪 このサイトは使用状況を追跡し、ユーザーエクスペリエンスを向上させるためにCookieを使用します。個人識別情報は収集しません。",
    cookieAccept: "同意する"
  },
  
  es: {
    metaDescription: "Convierte un artículo de blog en 10 publicaciones optimizadas para redes sociales en 30 segundos. Herramienta gratuita de IA para Twitter, LinkedIn, Instagram y Facebook.",

    title: "✨ ContentSplitter",
    subtitle: "Transforma contenido largo en publicaciones de redes sociales automáticamente",
    
    inputTitle: "Ingresa tu Contenido",
    exampleBtn: "💡 Ver Ejemplo",
    placeholder: "Pega tu artículo de blog, guión de YouTube o cualquier contenido largo aquí...",
    charCount: "caracteres",
    
    platformTitle: "Seleccionar Plataformas:",
    platforms: {
      instagram: "📸 Instagram",
      twitter: "🐦 Twitter",
      linkedin: "💼 LinkedIn",
      facebook: "👍 Facebook"
    },
    
    toneTitle: "Seleccionar Tono:",
    tones: {
      professional: "🎩 Profesional",
      friendly: "😊 Amigable",
      casual: "✌️ Casual",
      enthusiastic: "🔥 Entusiasta"
    },
    
    hashtagTitle: "Cantidad de Hashtags (Instagram):",
    hashtagCount: "",
    
    convertBtn: "🚀 Convertir a Publicaciones Sociales",
    shareBtn: "🔗 Compartir Resultados",
    copyBtn: "📋 Copiar",
    copiedBtn: "✅ ¡Copiado!",
    upgradeBtn: "⭐ Actualizar a Premium",
    
    loadingMessages: [
      "La IA está analizando tu contenido...",
      "Creando publicaciones perfectas para redes sociales...",
      "Ajustando tono y estilo...",
      "Optimizando hashtags...",
      "Convirtiendo para cada plataforma...",
      "Añadiendo toques finales..."
    ],
    
    resultsTitle: "✅ ¡Conversión Completa!",
    charInfo: "caracteres",
    overLimit: "(⚠️ ¡Límite Excedido!)",
    
    alerts: {
      noContent: "¡Por favor ingresa tu contenido!",
      tooShort: "¡Por favor ingresa al menos 50 caracteres para mejores resultados!",
      noPlatform: "¡Por favor selecciona al menos una plataforma!",
      error: "Ocurrió un error durante la conversión. Por favor intenta de nuevo.\n\nError: ",
      shareSuccess: "¡Enlace copiado! ¡Compártelo con tus amigos! 🎉",
      limitReached: "Has usado todas las conversiones gratuitas de hoy.\n¿Te gustaría actualizar a Premium?",
      usageCount: "Conversiones gratuitas: {current}/{total} usadas hoy",
      checkoutError: "Ocurrió un error al crear la página de pago. Por favor, inténtelo de nuevo."
    },
    
    footer: "Hecho con ❤️ por Seungmin",
    version: "v2.0 - Beta Global",
    
    cookieMessage: "🍪 Este sitio utiliza cookies para rastrear el uso y mejorar la experiencia del usuario. No recopilamos información de identificación personal.",
    cookieAccept: "Aceptar"
  }
};

// 브라우저 언어 감지 함수
function detectBrowserLanguage() {
  // 이미 저장된 언어가 있으면 그것을 사용
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang;
  }
  
  // 브라우저 언어 가져오기
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 언어 코드 추출 (예: 'ko-KR' -> 'ko', 'en-US' -> 'en')
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // 지원하는 언어인지 확인
  const supportedLanguages = ['ko', 'en', 'ja', 'es'];
  
  if (supportedLanguages.includes(langCode)) {
    return langCode;
  }
  
  // 지원하지 않는 언어면 영어로 기본 설정
  return 'en';
}

// 현재 언어 가져오기 (브라우저 언어 자동 감지 적용)
let currentLang = detectBrowserLanguage();
window.currentLang = currentLang;
// 감지된 언어를 저장 (다음 방문 시 사용)
localStorage.setItem('language', currentLang);

// 번역 함수
function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// 언어 변경 함수
function setLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('language', lang);
  updateUI();
}

// UI 업데이트 함수
function updateUI() {
  // 텍스트 업데이트
  document.querySelector('header h1').textContent = t('title');
  document.querySelector('header p').textContent = t('subtitle');
  document.querySelector('.input-section h2').textContent = t('inputTitle');
  document.getElementById('exampleBtn').textContent = t('exampleBtn');
  document.getElementById('contentInput').placeholder = t('placeholder');
  document.querySelector('.platform-select > label').textContent = t('platformTitle');
  document.querySelector('.tone-select > label').textContent = t('toneTitle');
  document.querySelector('.options-section > label').textContent = t('hashtagTitle');
  document.getElementById('convertBtn').textContent = t('convertBtn');
  document.getElementById('shareBtn').textContent = t('shareBtn');
  document.getElementById('versionInfo').textContent = t('version');
  
  // 쿠키 배너 텍스트
  const cookieText = document.getElementById('cookieText');
  if (cookieText) {
    cookieText.textContent = t('cookieMessage');
  }
  const acceptBtn = document.getElementById('acceptCookies');
  if (acceptBtn) {
    acceptBtn.textContent = t('cookieAccept');
  }
  
  // 플랫폼 라벨
  const platformLabels = document.querySelectorAll('.checkboxes label');
  platformLabels[0].childNodes[2].textContent = ' ' + t('platforms.instagram');
  platformLabels[1].childNodes[2].textContent = ' ' + t('platforms.twitter');
  platformLabels[2].childNodes[2].textContent = ' ' + t('platforms.linkedin');
  platformLabels[3].childNodes[2].textContent = ' ' + t('platforms.facebook');
  
  // 톤앤매너 라벨
  const toneLabels = document.querySelectorAll('.radio-label span');
  toneLabels[0].textContent = t('tones.professional');
  toneLabels[1].textContent = t('tones.friendly');
  toneLabels[2].textContent = t('tones.casual');
  toneLabels[3].textContent = t('tones.enthusiastic');

  // Meta description 업데이트
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', t('metaDescription'));
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', t('metaDescription'));

  // html lang 속성 업데이트
  document.documentElement.lang = currentLang;
}

// 예시 텍스트 (언어별)
const exampleTexts = {
  ko: `오늘부터 나는 코딩을 시작했다.

사실 한 달 전만 해도 코딩은 나와 전혀 상관없는 일이라고 생각했다. 하지만 AI 도구들이 발전하면서, 이제는 코딩 경험이 전혀 없는 사람도 자신만의 웹사이트나 앱을 만들 수 있게 되었다.

Cursor라는 AI 코드 에디터를 사용하면서, 처음으로 "나도 뭔가 만들 수 있구나"라는 자신감이 생겼다. 단 하루 만에 첫 프로젝트를 완성하는 것이 목표다.

가장 중요한 건 완벽함이 아니라 시작하는 것. 70% 완성도에서 일단 출시하고, 사용자 피드백을 받으면서 개선해나가는 것이 진짜 성장이다.

여러분도 미루지 말고 오늘 바로 시작해보세요!`,

  en: `Today, I started coding.

Just a month ago, I thought coding had nothing to do with me. But with the advancement of AI tools, even people with no coding experience can now create their own websites or apps.

Using an AI code editor called Cursor, I gained confidence for the first time that "I can actually build something." My goal is to complete my first project in just one day.

The most important thing is not perfection, but starting. Launch at 70% completion, gather user feedback, and improve—that's real growth.

Don't wait. Start today!`,

  ja: `今日、私はコーディングを始めました。

わずか1ヶ月前まで、コーディングは自分とは全く関係ないと思っていました。しかし、AIツールの進化により、コーディング経験が全くない人でも、自分のウェブサイトやアプリを作れるようになりました。

Cursorというコード補完AIを使って、初めて「自分でも何か作れるんだ」という自信が生まれました。たった1日で最初のプロジェクトを完成させることが目標です。

最も重要なのは完璧さではなく、始めることです。70%の完成度でローンチし、ユーザーのフィードバックを受けながら改善していく—それが本当の成長です。

待たないでください。今日から始めましょう!`,

  es: `Hoy comencé a programar.

Hace apenas un mes, pensaba que la programación no tenía nada que ver conmigo. Pero con el avance de las herramientas de IA, incluso las personas sin experiencia en programación ahora pueden crear sus propios sitios web o aplicaciones.

Usando un editor de código con IA llamado Cursor, gané confianza por primera vez de que "realmente puedo construir algo". Mi objetivo es completar mi primer proyecto en solo un día.

Lo más importante no es la perfección, sino comenzar. Lanza con un 70% de completitud, recopila comentarios de los usuarios y mejora—ese es el verdadero crecimiento.

No esperes. ¡Comienza hoy!`
};

function getExampleText() {
  return exampleTexts[currentLang] || exampleTexts['en'];
}