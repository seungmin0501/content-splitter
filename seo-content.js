// SEO 섹션 다국어 콘텐츠
const seoContent = {
    ko: {
      howItWorks: {
        title: "사용 방법",
        steps: [
          { icon: "📋", title: "콘텐츠 붙여넣기", desc: "블로그 글, 기사 또는 긴 텍스트를 복사하세요" },
          { icon: "🎯", title: "설정 선택", desc: "브랜드에 맞는 플랫폼과 톤을 선택하세요" },
          { icon: "✨", title: "결과 받기", desc: "몇 초 만에 최적화된 포스트를 받으세요. 복사하고 게시하세요!" }
        ]
      },
      benefits: {
        title: "왜 ContentSplitter를 사용해야 하나요?",
        items: [
          { icon: "⚡", title: "시간 절약", desc: "30초 만에 블로그 글 하나를 10개 이상의 SNS 포스트로 변환" },
          { icon: "🎯", title: "플랫폼 최적화", desc: "Twitter, LinkedIn, Instagram에 맞춤화된 각 포스트" },
          { icon: "🤖", title: "AI 기반 품질", desc: "목소리를 유지하는 자연스러운 포스트" },
          { icon: "🌍", title: "다국어 지원", desc: "영어, 한국어, 스페인어, 일본어 지원" },
          { icon: "💰", title: "무료 시작", desc: "신용카드 없이 하루 3회 무료 변환" },
          { icon: "🎨", title: "다양한 톤", desc: "전문적, 캐주얼, 스토리텔링 스타일" }
        ]
      },
      useCases: {
        title: "이런 분들께 완벽합니다",
        items: [
          { icon: "📝", title: "콘텐츠 크리에이터", desc: "블로그 글을 Twitter 스레드, LinkedIn 포스트, Instagram 캡션으로 변환" },
          { icon: "📊", title: "디지털 마케터", desc: "일관된 메시지를 유지하면서 여러 플랫폼에 콘텐츠 재활용" },
          { icon: "🚀", title: "스타트업 & SaaS", desc: "공지사항과 업데이트를 플랫폼별 최적화된 포스트로 변환" },
          { icon: "✍️", title: "프리랜스 작가", desc: "고객에게 콘텐츠 재활용을 추가 서비스로 제공" }
        ]
      },
      faq: {
        title: "자주 묻는 질문",
        items: [
          {
            q: "블로그 글을 SNS 포스트로 어떻게 변환하나요?",
            a: "ContentSplitter에 블로그 글을 붙여넣고, 타겟 플랫폼(Twitter, LinkedIn, Instagram)을 선택한 후 변환을 클릭하세요. AI가 각 플랫폼에 맞게 자동으로 최적화합니다."
          },
          {
            q: "블로그 글을 Twitter 스레드로 변환할 수 있나요?",
            a: "네! ContentSplitter는 긴 블로그 글을 매력적인 Twitter 스레드로 변환하며, 280자 이내로 자동 분할하면서도 흐름과 가독성을 유지합니다."
          },
          {
            q: "ContentSplitter는 무료인가요?",
            a: "네! 신용카드 없이 하루 3회 무료 변환을 제공합니다. 프리미엄 사용자($9.99/월)는 무제한 변환과 다양한 톤, 다국어 지원 등의 고급 기능을 이용할 수 있습니다."
          },
          {
            q: "어떤 플랫폼을 지원하나요?",
            a: "ContentSplitter는 Twitter/X 스레드, LinkedIn 포스트, Instagram 캡션을 최적화합니다. 각 플랫폼별로 맞춤 형식, 적절한 톤, 플랫폼별 모범 사례를 적용합니다."
          },
          {
            q: "AI 콘텐츠 재활용은 어떻게 작동하나요?",
            a: "ContentSplitter는 고급 AI(Claude)를 사용하여 콘텐츠의 핵심 메시지를 이해하고 각 소셜 미디어 플랫폼에 맞게 재작성합니다."
          },
          {
            q: "생성된 SNS 포스트를 수정할 수 있나요?",
            a: "네! 변환 후 모든 생성된 포스트를 복사하기 전에 검토하고 수정할 수 있습니다."
          }
        ]
      }
    },
    en: {
      howItWorks: {
        title: "How It Works",
        steps: [
          { icon: "📋", title: "Paste Your Content", desc: "Copy your blog post, article, or any long-form content" },
          { icon: "🎯", title: "Choose Settings", desc: "Select platforms and tone that matches your brand" },
          { icon: "✨", title: "Get Results", desc: "Receive optimized posts in seconds. Copy and publish!" }
        ]
      },
      benefits: {
        title: "Why Use ContentSplitter?",
        items: [
          { icon: "⚡", title: "Save Time", desc: "Convert one blog post into 10+ social media posts in 30 seconds" },
          { icon: "🎯", title: "Platform Optimization", desc: "Each post tailored for Twitter, LinkedIn, or Instagram" },
          { icon: "🤖", title: "AI-Powered Quality", desc: "Natural-sounding posts that maintain your voice" },
          { icon: "🌍", title: "Multi-Language", desc: "English, Korean, Spanish, and Japanese support" },
          { icon: "💰", title: "Free to Start", desc: "3 free conversions daily, no credit card required" },
          { icon: "🎨", title: "Multiple Tones", desc: "Professional, Casual, or Storytelling styles" }
        ]
      },
      useCases: {
        title: "Perfect For",
        items: [
          { icon: "📝", title: "Content Creators", desc: "Turn blog posts into Twitter threads, LinkedIn posts, and Instagram captions" },
          { icon: "📊", title: "Digital Marketers", desc: "Repurpose content across platforms while maintaining consistent messaging" },
          { icon: "🚀", title: "Startups & SaaS", desc: "Convert announcements and updates into platform-optimized posts" },
          { icon: "✍️", title: "Freelance Writers", desc: "Offer content repurposing as an additional service to clients" }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "How do I convert a blog post to social media posts?",
            a: "Simply paste your blog post into ContentSplitter, select your target platforms (Twitter, LinkedIn, Instagram), and click Convert. Our AI will automatically optimize your content for each platform in 30 seconds."
          },
          {
            q: "Can I convert blog posts to Twitter threads?",
            a: "Yes! ContentSplitter converts long-form blog posts into engaging Twitter threads, automatically breaking content into tweet-sized chunks (under 280 characters) while maintaining flow and readability."
          },
          {
            q: "Is ContentSplitter free to use?",
            a: "Yes! We offer 3 free conversions per day with no credit card required. Premium users ($9.99/month) get unlimited conversions plus advanced features like multiple tones and multi-language support."
          },
          {
            q: "What platforms does ContentSplitter support?",
            a: "ContentSplitter optimizes content for Twitter/X threads, LinkedIn posts, and Instagram captions. Each platform gets custom formatting, appropriate tone, and platform-specific best practices."
          },
          {
            q: "How does AI content repurposing work?",
            a: "ContentSplitter uses advanced AI (Claude) to understand your content's key messages and rewrite them for each social media platform."
          },
          {
            q: "Can I edit the generated social media posts?",
            a: "Yes! After conversion, you can review and edit all generated posts before copying them."
          }
        ]
      }
    }
  };
  
  // 언어 감지
  let currentLang = (navigator.language || navigator.userLanguage).startsWith('ko') ? 'ko' : 'en';
  
  // SEO 섹션 생성
  function createSEOSections() {
    const content = seoContent[currentLang];
    
    // How It Works
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
      stepsGrid.innerHTML = content.howItWorks.steps.map(step => `
        <div class="step-card">
          <span class="step-icon">${step.icon}</span>
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      `).join('');
    }
    
    const howItWorksTitle = document.querySelector('.how-it-works-section h2');
    if (howItWorksTitle) howItWorksTitle.textContent = content.howItWorks.title;
  
    // Benefits
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (benefitsGrid) {
      benefitsGrid.innerHTML = content.benefits.items.map(item => `
        <div class="benefit-card">
          <span class="benefit-icon">${item.icon}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `).join('');
    }
    
    const benefitsTitle = document.querySelector('.benefits-section h2');
    if (benefitsTitle) benefitsTitle.textContent = content.benefits.title;
  
    // Use Cases
    const useCasesGrid = document.querySelector('.use-cases-grid');
    if (useCasesGrid) {
      useCasesGrid.innerHTML = content.useCases.items.map(item => `
        <div class="use-case-card">
          <span class="use-case-icon">${item.icon}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `).join('');
    }
    
    const useCasesTitle = document.querySelector('.use-cases-section h2');
    if (useCasesTitle) useCasesTitle.textContent = content.useCases.title;
  
    // FAQ
    const faqContainer = document.querySelector('.faq-section .container');
    if (faqContainer) {
      const faqHTML = content.faq.items.map((item, index) => `
        <div class="faq-item collapsed" onclick="this.classList.toggle('collapsed')">
          <h3>${index + 1}️⃣ ${item.q}</h3>
          <div class="faq-answer">
            <p>${item.a}</p>
          </div>
        </div>
      `).join('');
      
      faqContainer.innerHTML = `<h2>${content.faq.title}</h2>${faqHTML}`;
    }
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', createSEOSections);