// DOM 요소들
const contentInput = document.getElementById('contentInput');
const convertBtn = document.getElementById('convertBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const hashtagSlider = document.getElementById('hashtagCount');
const hashtagValue = document.getElementById('hashtagValue');
const charCount = document.getElementById('charCount');
const exampleBtn = document.getElementById('exampleBtn');
const shareBtn = document.getElementById('shareBtn');
const loadingMessage = document.getElementById('loadingMessage');
const languageSelect = document.getElementById('languageSelect');

// 언어 선택 이벤트
languageSelect.value = window.currentLang;
languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    
    // SEO 섹션 업데이트
    if (window.updateSEOLanguage) {
        window.updateSEOLanguage();
    }
    
    // 글자 수 업데이트
    updateCharCount();
    updateHashtagDisplay();

    // 모달 언어 업데이트 추가!
    if (window.updateModalLanguage) {
        window.updateModalLanguage();
    }
});

// 페이지 로드 시 UI 업데이트
updateUI();

// 사용 횟수 표시 업데이트
updateUsageDisplay();

// 로딩 메시지 배열 (다국어)
function getLoadingMessages() {
    return t('loadingMessages');
}

// 예시 보기 버튼
exampleBtn.addEventListener('click', () => {
    contentInput.value = getExampleText();
    updateCharCount();
    
    // 스크롤 애니메이션
    contentInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 살짝 하이라이트 효과
    contentInput.style.borderColor = '#667eea';
    setTimeout(() => {
        contentInput.style.borderColor = '';
    }, 1000);
});

// 글자 수 업데이트
function updateCharCount() {
    const count = contentInput.value.length;
    const units = {
        ko: '자',
        en: ' chars',
        es: ' caracteres',
        ja: '文字',
        zh: '字'
    };
    const unit = units[window.currentLang] || ' chars';
    charCount.textContent = count.toLocaleString() + unit;
}

contentInput.addEventListener('input', updateCharCount);

// 해시태그 슬라이더 업데이트
hashtagSlider.addEventListener('input', (e) => {
    const units = {
        ko: '개',
        en: '',
        es: '',
        ja: '個',
        zh: '个'
    };
    const unit = units[window.currentLang] || '';
    hashtagValue.textContent = `${e.target.value}${unit}`;
});

// 해시태그 표시 업데이트 함수
function updateHashtagDisplay() {
    const units = {
        ko: '개',
        en: '',
        es: '',
        ja: '個',
        zh: '个'
    };
    const unit = units[window.currentLang] || '';
    hashtagValue.textContent = `${hashtagSlider.value}${unit}`;
}

// 로딩 메시지 랜덤 변경
function startLoadingAnimation() {
    let messageIndex = 0;
    const messages = getLoadingMessages();
    
    const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        loadingMessage.textContent = messages[messageIndex];
    }, 2000);
    
    return interval;
}

// 버튼 클릭 이벤트
convertBtn.addEventListener('click', async () => {
    // 사용 가능 여부 확인
    const usageStatus = canUseService();
    
    if (!usageStatus.allowed) {
        showUpgradeModal();
        return;
    }
    
    const content = contentInput.value.trim();
    
    if (!content) {
        alert(t('alerts.noContent'));
        return;
    }
    
    if (content.length < 50) {
        alert(t('alerts.tooShort'));
        return;
    }
    
    // 선택된 플랫폼 확인
    const selectedPlatforms = Array.from(document.querySelectorAll('.checkboxes input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (selectedPlatforms.length === 0) {
        alert(t('alerts.noPlatform'));
        return;
    }
    
    // 톤앤매너 선택 확인
    const toneInput = document.querySelector('input[name="tone"]:checked');
    const selectedTone = toneInput ? toneInput.value : 'professional';
    
    // 해시태그 개수
    const hashtagCount = parseInt(hashtagSlider.value);
    
    // UI 업데이트
    resultsSection.style.display = 'none';
    loadingSection.style.display = 'block';
    convertBtn.disabled = true;
    
    // 로딩 메시지 애니메이션 시작
    const loadingInterval = startLoadingAnimation();
    
    try {
        // AI API 호출
        const results = await convertContent(content, selectedPlatforms, selectedTone, hashtagCount);
        
        // 사용 횟수 증가
        incrementUsage();
        updateUsageDisplay();
        
        // 결과 표시
        displayResults(results);
        
        clearInterval(loadingInterval);
        loadingSection.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // 결과로 스크롤
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('Error:', error);
        clearInterval(loadingInterval);
        alert(t('alerts.error') + error.message);
        loadingSection.style.display = 'none';
    } finally {
        convertBtn.disabled = false;
    }
});

// AI API 호출 함수 (백엔드로 요청)
async function convertContent(content, platforms, tone, hashtagCount) {
    const apiUrl = '/api/convert';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60초 타임아웃

    try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            platforms: platforms,
            tone: tone,
            hashtagCount: hashtagCount
        }),
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
        if (data.error === 'TOO_MANY_REQUESTS') {
            throw new Error(t('alerts.tooManyRequests'));
        }
        throw new Error(data.error || t('alerts.conversionFailed'));
    }
    
    return data.results;
    } catch (err) {
        clearTimeout(timeoutId);
        throw err;
    }
}

// 결과 표시 함수
function displayResults(results) {
    resultsContainer.innerHTML = '';
    
    const platformNames = {
        instagram: t('platforms.instagram'),
        twitter: t('platforms.twitter'),
        linkedin: t('platforms.linkedin'),
        facebook: t('platforms.facebook')
    };
    
    const platformLimits = {
        instagram: 2200,
        twitter: 280,
        linkedin: 3000,
        facebook: 63206
    };
    
    for (const [platform, content] of Object.entries(results)) {
        if (!content) continue;
        
        const charLength = content.length;
        const limit = platformLimits[platform];
        const isOverLimit = charLength > limit;

        const card = document.createElement('div');
        card.className = 'result-card';

        const h3 = document.createElement('h3');
        h3.textContent = platformNames[platform] || platform;

        const charInfo = document.createElement('div');
        charInfo.className = 'char-info';
        charInfo.style.color = isOverLimit ? '#f44336' : '#4caf50';
        charInfo.textContent = `${charLength.toLocaleString()} ${t('charInfo')} ${isOverLimit ? t('overLimit') : '/ ' + limit.toLocaleString() + ' ' + t('charInfo')}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.textContent = content;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = t('copyBtn');
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(content);
                copyBtn.textContent = t('copiedBtn');
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = t('copyBtn');
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                alert(t('alerts.copyFailed'));
            }
        });

        card.appendChild(h3);
        card.appendChild(charInfo);
        card.appendChild(contentDiv);
        card.appendChild(copyBtn);
        resultsContainer.appendChild(card);
    }
}

// 결과 공유 기능
shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    
    try {
        if (navigator.share) {
            // 모바일 공유 API
            await navigator.share({
                title: 'ContentSplitter - AI Content Converter',
                text: t('subtitle'),
                url: url
            });
        } else {
            // 데스크톱: URL 복사
            await navigator.clipboard.writeText(url);
            alert(t('alerts.shareSuccess'));
        }
    } catch (err) {
        // Share not supported or cancelled
    }
});

// 엔터 키로 변환 (Shift+Enter는 줄바꿈)
contentInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        convertBtn.click();
    }
});

// 초기 글자 수 표시
updateCharCount();

// 쿠키 동의 배너
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const cookieConsent = getCookie('cookie_consent');
    
    if (!cookieConsent && banner) {
        banner.classList.add('show');
    }
}

// 쿠키 동의 처리
document.getElementById('acceptCookies')?.addEventListener('click', () => {
    setCookie('cookie_consent', 'accepted', 365);
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'none';
    }
});

// 페이지 로드 시 쿠키 배너 표시
setTimeout(showCookieBanner, 1000); // 1초 후 표시

// FAQ 키보드 접근성
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        const isCollapsed = this.classList.toggle('collapsed');
        this.setAttribute('aria-expanded', String(!isCollapsed));
    });
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isCollapsed = this.classList.toggle('collapsed');
            this.setAttribute('aria-expanded', String(!isCollapsed));
        }
    });
});