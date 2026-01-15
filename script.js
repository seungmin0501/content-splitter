// DOM 요소들
const contentInput = document.getElementById('contentInput');
const convertBtn = document.getElementById('convertBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const hashtagSlider = document.getElementById('hashtagCount');
const hashtagValue = document.getElementById('hashtagValue');

// 해시태그 슬라이더 업데이트
hashtagSlider.addEventListener('input', (e) => {
    hashtagValue.textContent = `${e.target.value}개`;
});

// 버튼 클릭 이벤트
convertBtn.addEventListener('click', async () => {
    const content = contentInput.value.trim();
    
    if (!content) {
        alert('콘텐츠를 입력해주세요!');
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
    
    try {
        // AI API 호출
        const results = await convertContent(content, selectedPlatforms, selectedTone, hashtagCount);
        
        // 결과 표시
        displayResults(results);
        
        loadingSection.style.display = 'none';
        resultsSection.style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        alert('변환 중 오류가 발생했습니다. 다시 시도해주세요.');
        loadingSection.style.display = 'none';
    } finally {
        convertBtn.disabled = false;
    }
});

// AI API 호출 함수 (백엔드로 요청)
async function convertContent(content, platforms, tone, hashtagCount) {
    // 백엔드 API 호출
    const response = await fetch('http://localhost:3001/api/convert', {
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
        linkedin: '💼 링크드인'
    };
    
    const platformEmojis = {
        instagram: '📸',
        twitter: '🐦',
        linkedin: '💼'
    };
    
    for (const [platform, content] of Object.entries(results)) {
        if (!content) continue;
        
        const card = document.createElement('div');
        card.className = 'result-card';
        
        card.innerHTML = `
            <h3>${platformNames[platform] || platform}</h3>
            <div class="content">${content}</div>
            <button class="copy-btn" data-content="${content.replace(/"/g, '&quot;')}">
                📋 복사하기
            </button>
        `;
        
        resultsContainer.appendChild(card);
    }
    
    // 복사 버튼 이벤트
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const content = e.target.getAttribute('data-content');
            
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

// 엔터 키로 변환 (Shift+Enter는 줄바꿈)
contentInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        convertBtn.click();
    }
});