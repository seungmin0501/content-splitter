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
    },
    ja: {
      howItWorks: {
        title: "使い方",
        steps: [
          { icon: "📋", title: "コンテンツを貼り付け", desc: "ブログ記事や長文コンテンツをコピーします" },
          { icon: "🎯", title: "設定を選択", desc: "ブランドに合ったプラットフォームとトーンを選択します" },
          { icon: "✨", title: "結果を取得", desc: "数秒で最適化された投稿を受け取ります。コピーして投稿!" }
        ]
      },
      benefits: {
        title: "ContentSplitterを使う理由",
        items: [
          { icon: "⚡", title: "時間を節約", desc: "30秒でブログ記事を10以上のSNS投稿に変換" },
          { icon: "🎯", title: "プラットフォーム最適化", desc: "Twitter、LinkedIn、Instagram向けに最適化" },
          { icon: "🤖", title: "AI駆動の品質", desc: "あなたの声を保つ自然な投稿" },
          { icon: "🌍", title: "多言語対応", desc: "英語、韓国語、スペイン語、日本語対応" },
          { icon: "💰", title: "無料で開始", desc: "クレジットカード不要で1日3回無料変換" },
          { icon: "🎨", title: "複数のトーン", desc: "プロフェッショナル、カジュアル、ストーリーテリングスタイル" }
        ]
      },
      useCases: {
        title: "こんな方に最適",
        items: [
          { icon: "📝", title: "コンテンツクリエイター", desc: "ブログをTwitterスレッド、LinkedIn投稿、Instagramキャプションに変換" },
          { icon: "📊", title: "デジタルマーケター", desc: "一貫したメッセージを保ちながら複数のプラットフォームでコンテンツを再利用" },
          { icon: "🚀", title: "スタートアップ & SaaS", desc: "お知らせや更新をプラットフォーム最適化された投稿に変換" },
          { icon: "✍️", title: "フリーランスライター", desc: "コンテンツ再利用を顧客への追加サービスとして提供" }
        ]
      },
      faq: {
        title: "よくある質問",
        items: [
          {
            q: "ブログ記事をSNS投稿に変換するには？",
            a: "ContentSplitterにブログ記事を貼り付け、ターゲットプラットフォーム（Twitter、LinkedIn、Instagram）を選択して変換をクリックします。AIが30秒で各プラットフォームに最適化します。"
          },
          {
            q: "ブログ記事をTwitterスレッドに変換できますか？",
            a: "はい！ContentSplitterは長文ブログ記事を魅力的なTwitterスレッドに変換し、280文字以内に自動分割しながら流れと読みやすさを維持します。"
          },
          {
            q: "ContentSplitterは無料ですか？",
            a: "はい！クレジットカード不要で1日3回の無料変換を提供しています。プレミアムユーザー（月額$9.99）は無制限変換と複数トーン、多言語対応などの高度な機能を利用できます。"
          },
          {
            q: "どのプラットフォームに対応していますか？",
            a: "ContentSplitterはTwitter/Xスレッド、LinkedIn投稿、Instagramキャプションを最適化します。各プラットフォームにカスタムフォーマット、適切なトーン、プラットフォーム固有のベストプラクティスを適用します。"
          },
          {
            q: "AIコンテンツ再利用はどのように機能しますか？",
            a: "ContentSplitterは高度なAI（Claude）を使用してコンテンツの主要メッセージを理解し、各ソーシャルメディアプラットフォーム向けに書き直します。"
          },
          {
            q: "生成されたSNS投稿を編集できますか？",
            a: "はい！変換後、コピーする前にすべての生成された投稿を確認して編集できます。"
          }
        ]
      }
    },
    es: {
      howItWorks: {
        title: "Cómo Funciona",
        steps: [
          { icon: "📋", title: "Pega tu Contenido", desc: "Copia tu publicación de blog, artículo o cualquier contenido extenso" },
          { icon: "🎯", title: "Elige la Configuración", desc: "Selecciona plataformas y tono que coincidan con tu marca" },
          { icon: "✨", title: "Obtén Resultados", desc: "¡Recibe publicaciones optimizadas en segundos. Copia y publica!" }
        ]
      },
      benefits: {
        title: "¿Por Qué Usar ContentSplitter?",
        items: [
          { icon: "⚡", title: "Ahorra Tiempo", desc: "Convierte una publicación de blog en más de 10 publicaciones de redes sociales en 30 segundos" },
          { icon: "🎯", title: "Optimización de Plataforma", desc: "Cada publicación adaptada para Twitter, LinkedIn o Instagram" },
          { icon: "🤖", title: "Calidad Impulsada por IA", desc: "Publicaciones que suenan naturales y mantienen tu voz" },
          { icon: "🌍", title: "Multi-Idioma", desc: "Soporte para inglés, coreano, español y japonés" },
          { icon: "💰", title: "Comienza Gratis", desc: "3 conversiones gratuitas diarias, sin tarjeta de crédito requerida" },
          { icon: "🎨", title: "Múltiples Tonos", desc: "Estilos profesional, casual o narrativo" }
        ]
      },
      useCases: {
        title: "Perfecto Para",
        items: [
          { icon: "📝", title: "Creadores de Contenido", desc: "Convierte publicaciones de blog en hilos de Twitter, publicaciones de LinkedIn y subtítulos de Instagram" },
          { icon: "📊", title: "Especialistas en Marketing Digital", desc: "Reutiliza contenido en plataformas manteniendo mensajes consistentes" },
          { icon: "🚀", title: "Startups y SaaS", desc: "Convierte anuncios y actualizaciones en publicaciones optimizadas por plataforma" },
          { icon: "✍️", title: "Escritores Freelance", desc: "Ofrece la reutilización de contenido como servicio adicional a los clientes" }
        ]
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          {
            q: "¿Cómo convierto una publicación de blog en publicaciones de redes sociales?",
            a: "Simplemente pega tu publicación de blog en ContentSplitter, selecciona tus plataformas objetivo (Twitter, LinkedIn, Instagram) y haz clic en Convertir. Nuestra IA optimizará automáticamente tu contenido para cada plataforma en 30 segundos."
          },
          {
            q: "¿Puedo convertir publicaciones de blog en hilos de Twitter?",
            a: "¡Sí! ContentSplitter convierte publicaciones de blog extensas en hilos atractivos de Twitter, dividiendo automáticamente el contenido en fragmentos del tamaño de tweets (menos de 280 caracteres) mientras mantiene el flujo y la legibilidad."
          },
          {
            q: "¿ContentSplitter es gratuito?",
            a: "¡Sí! Ofrecemos 3 conversiones gratuitas por día sin necesidad de tarjeta de crédito. Los usuarios premium ($9.99/mes) obtienen conversiones ilimitadas además de funciones avanzadas como múltiples tonos y soporte multiidioma."
          },
          {
            q: "¿Qué plataformas admite ContentSplitter?",
            a: "ContentSplitter optimiza contenido para hilos de Twitter/X, publicaciones de LinkedIn y subtítulos de Instagram. Cada plataforma obtiene formato personalizado, tono apropiado y mejores prácticas específicas de la plataforma."
          },
          {
            q: "¿Cómo funciona la reutilización de contenido con IA?",
            a: "ContentSplitter utiliza IA avanzada (Claude) para comprender los mensajes clave de tu contenido y reescribirlos para cada plataforma de redes sociales."
          },
          {
            q: "¿Puedo editar las publicaciones de redes sociales generadas?",
            a: "¡Sí! Después de la conversión, puedes revisar y editar todas las publicaciones generadas antes de copiarlas."
          }
        ]
      }
    }
  };
  
  // SEO 섹션 생성
  function createSEOSections() {
    // 전역 currentLang 사용
    const lang = window.currentLang || 'en';
    const content = seoContent[lang];
    
    if (!content) {
      console.warn('SEO content not found for language:', lang);
      return;
    }
    
    // 카드 생성 헬퍼
    function createCard(className, iconClass, item) {
      const card = document.createElement('div');
      card.className = className;
      const icon = document.createElement('span');
      icon.className = iconClass;
      icon.textContent = item.icon;
      const h3 = document.createElement('h3');
      h3.textContent = item.title;
      const p = document.createElement('p');
      p.textContent = item.desc;
      card.appendChild(icon);
      card.appendChild(h3);
      card.appendChild(p);
      return card;
    }

    // How It Works
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
      stepsGrid.textContent = '';
      content.howItWorks.steps.forEach(step => {
        stepsGrid.appendChild(createCard('step-card', 'step-icon', step));
      });
    }

    const howItWorksTitle = document.querySelector('.how-it-works-section h2');
    if (howItWorksTitle) howItWorksTitle.textContent = content.howItWorks.title;

    // Benefits
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (benefitsGrid) {
      benefitsGrid.textContent = '';
      content.benefits.items.forEach(item => {
        benefitsGrid.appendChild(createCard('benefit-card', 'benefit-icon', item));
      });
    }

    const benefitsTitle = document.querySelector('.benefits-section h2');
    if (benefitsTitle) benefitsTitle.textContent = content.benefits.title;

    // Use Cases
    const useCasesGrid = document.querySelector('.use-cases-grid');
    if (useCasesGrid) {
      useCasesGrid.textContent = '';
      content.useCases.items.forEach(item => {
        useCasesGrid.appendChild(createCard('use-case-card', 'use-case-icon', item));
      });
    }

    const useCasesTitle = document.querySelector('.use-cases-section h2');
    if (useCasesTitle) useCasesTitle.textContent = content.useCases.title;

    // FAQ
    const faqContainer = document.querySelector('.faq-section .container');
    if (faqContainer) {
      faqContainer.textContent = '';
      const faqTitle = document.createElement('h2');
      faqTitle.textContent = content.faq.title;
      faqContainer.appendChild(faqTitle);

      content.faq.items.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item collapsed';
        faqItem.setAttribute('tabindex', '0');
        faqItem.setAttribute('role', 'button');
        faqItem.setAttribute('aria-expanded', 'false');
        faqItem.addEventListener('click', function() {
          const isCollapsed = this.classList.toggle('collapsed');
          this.setAttribute('aria-expanded', String(!isCollapsed));
        });
        faqItem.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isCollapsed = this.classList.toggle('collapsed');
            this.setAttribute('aria-expanded', String(!isCollapsed));
          }
        });

        const h3 = document.createElement('h3');
        h3.textContent = `${index + 1}️⃣ ${item.q}`;
        const answerDiv = document.createElement('div');
        answerDiv.className = 'faq-answer';
        const p = document.createElement('p');
        p.textContent = item.a;
        answerDiv.appendChild(p);
        faqItem.appendChild(h3);
        faqItem.appendChild(answerDiv);
        faqContainer.appendChild(faqItem);
      });
    }
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', createSEOSections);
  
  // 언어 변경 시 SEO 섹션 업데이트
  window.updateSEOLanguage = function() {
    createSEOSections();
  };