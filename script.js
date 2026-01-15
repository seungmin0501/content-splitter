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
const darkModeToggle = document.getElementById('darkModeToggle');
const shareBtn = document.getElementById('shareBtn');
const loadingMessage = document.getElementById('loadingMessage');

// 로딩 메시지 배열
const loadingMessages = [
    "AI가 콘텐츠를 분석하고 있어요...",
    "완벽한 SNS 포스트를 만들고 있어요...",
    "톤앤매너를 조정하는 중...",
    "해시태그를 최적화하는 중...",
    "각 플랫폼에 맞게 변환하는 중...",
    "마지막 손질을 하고 있어요..."
];

// 예시 텍스트
const exampleText = `오늘부터 나는 코딩을 시작했다.

사실 한 달 전만 해도 코딩은 나와 전혀 상관없는 일이라고 생각했다. 하지만 AI 도구들이 발전하면서, 이제는 코딩 경험이 전혀 없는 사람도 자신만의 웹사이트나 앱을 만들 수 있게 되었다.

Cursor라는 AI 코드 에디터를 사용하면서, 처음으로 "나도 뭔가 만들 수 있구나"라는 자신감이 생겼다. 단 하루 만에 첫 프로젝트를 완성하는 것이 목표다.

가장 중요한 건 완벽함이 아니라 시작하는 것. 70% 완성도에서 일단 출시하고, 사용자 피드백을 받으면서 개선해나가는 것이 진짜 성장이다.

여러분도 미루지 말고 오늘 바로 시작해보세요!`;

// 다크모드 설정 로드
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// 다크모드 토글
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// 예시 보기 버튼
exampleBtn.addEventListener('click', () => {
    contentInput.value = exampleText;
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
    charCount.textContent = count.toLocaleString();
}

contentInput.addEventListener('input', updateCharCount);

// 해시태그 슬라이더 업데이트
hashtagSlider.addEventListener('input', (e) => {
    hashtagValue.textContent = `${e.target.value}개`;
});

// 로딩 메시지 랜덤 변경
function startLoadingAnimation() {
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingMessage.textContent = loadingMessages[messageIndex];
    }, 2000);
    
    return interval;
}

// 버튼 클릭 이벤트
convertBtn.addEventListener('click', async () => {
    const content = contentInput.value.trim();
    
    if (!content) {
        alert('콘텐츠를 입력해주세요!');
        return;
    }
    
    if (content.length < 50) {
        alert('최소 50자 이상 입력해주세요. 더 긴 내용을 입력하면 더 좋은 결과를 얻을 수 있어요!');
        return;
    }
    
    // 선택된 플랫폼 확인
    const selectedPlatforms = Array.from(document.querySelectorAll('.checkboxes input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (selectedPlatforms.length === 0) {
        alert('최소 하나의 플랫폼을 선택해주세요!');
        return;
    }
    
    // 톤앤매너 선택 확인
    const selectedTone = document.querySelector('input[name="tone"]:checked').value;
    
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
        alert('변환 중 오류가 발생했습니다. 다시 시도해주세요.\n\n오류: ' + error.message);
        loadingSection.style.display = 'none';
    } finally {
        convertBtn.disabled = false;
    }
});

// AI API 호출 함수 (백엔드로 요청)
async function convertContent(content, platforms, tone, hashtagCount) {
    // Vercel Serverless Function으로 요청
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/convert'
        : '/api/convert';
    
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
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
        throw new Error(data.error || '변환 실패');
    }
    
    return data.results;
}

// 결과 표시 함수
function displayResults(results) {
    resultsContainer.innerHTML = '';
    
    const platformNames = {
        instagram: '📸 인스타그램',
        twitter: '🐦 트위터',
        linkedin: '💼 링크드인',
        facebook: '👍 페이스북'
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
        
        card.innerHTML = `
            <h3>${platformNames[platform] || platform}</h3>
            <div class="char-info" style="color: ${isOverLimit ? '#f44336' : '#4caf50'}">
                ${charLength.toLocaleString()}자 ${isOverLimit ? '(⚠️ 제한 초과!)' : '/ ' + limit.toLocaleString() + '자'}
            </div>
            <div class="content">${content}</div>
            <button class="copy-btn" data-content="${content.replace(/"/g, '&quot;').replace(/\n/g, '\\n')}">
                📋 복사하기
            </button>
        `;
        
        resultsContainer.appendChild(card);
    }
    
    // 복사 버튼 이벤트
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const content = e.target.getAttribute('data-content').replace(/\\n/g, '\n');
            
            try {
                await navigator.clipboard.writeText(content);
                e.target.textContent = '✅ 복사됨!';
                e.target.classList.add('copied');
                
                setTimeout(() => {
                    e.target.textContent = '📋 복사하기';
                    e.target.classList.remove('copied');
                }, 2000);
            } catch (err) {
                alert('복사 실패. 수동으로 복사해주세요.');
            }
        });
    });
}

// 결과 공유 기능
shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    
    try {
        if (navigator.share) {
            // 모바일 공유 API
            await navigator.share({
                title: 'ContentSplitter - AI 콘텐츠 변환 도구',
                text: '긴 글을 SNS 포스트로 자동 변환해보세요!',
                url: url
            });
        } else {
            // 데스크톱: URL 복사
            await navigator.clipboard.writeText(url);
            alert('링크가 복사되었습니다! 친구들에게 공유해보세요! 🎉');
        }
    } catch (err) {
        console.log('공유 실패:', err);
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