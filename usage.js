// 사용 횟수 추적 시스템
const FREE_DAILY_LIMIT = 3;

// 쿠키 설정 함수
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const secure = location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict" + secure;
}

// 쿠키 가져오기
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 오늘 날짜 가져오기
function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

// 사용 횟수 데이터 가져오기
function getUsageData() {
    const usageStr = getCookie('usage_data');
    if (!usageStr) return { date: getTodayString(), count: 0 };
    
    try {
        return JSON.parse(usageStr);
    } catch {
        return { date: getTodayString(), count: 0 };
    }
}

// 사용 횟수 저장
function saveUsageData(data) {
    setCookie('usage_data', JSON.stringify(data), 1); // 1일 유효
}

// 프리미엄 상태 확인 (webhook에서 설정한 서명된 코드 검증)
function isPremium() {
    const premiumCode = getCookie('premium_code');
    if (!premiumCode || premiumCode.length < 20) return false;
    // webhook에서 설정한 코드는 'ps_' 프리픽스로 시작
    return premiumCode.startsWith('ps_');
}

// 프리미엄 코드 설정
function setPremiumCode(code) {
    setCookie('premium_code', code, 365); // 1년 유효
}

// 사용 가능 여부 확인
function canUseService() {
    if (isPremium()) return { allowed: true, remaining: -1 }; // 무제한
    
    const usage = getUsageData();
    const today = getTodayString();
    
    // 날짜가 바뀌면 초기화
    if (usage.date !== today) {
        const newUsage = { date: today, count: 0 };
        saveUsageData(newUsage);
        return { allowed: true, remaining: FREE_DAILY_LIMIT };
    }
    
    // 사용 횟수 확인
    if (usage.count < FREE_DAILY_LIMIT) {
        return { allowed: true, remaining: FREE_DAILY_LIMIT - usage.count };
    }
    
    return { allowed: false, remaining: 0 };
}

// 사용 횟수 증가
function incrementUsage() {
    if (isPremium()) return; // 프리미엄은 카운트 안 함
    
    const usage = getUsageData();
    const today = getTodayString();
    
    if (usage.date !== today) {
        // 새로운 날짜
        usage.date = today;
        usage.count = 1;
    } else {
        usage.count++;
    }
    
    saveUsageData(usage);
}

// 사용 횟수 정보 표시 업데이트
function updateUsageDisplay() {
    const statusEl = document.getElementById('usageStatus');
    if (!statusEl) return;
    
    statusEl.textContent = '';
    const infoDiv = document.createElement('div');

    if (isPremium()) {
        infoDiv.className = 'usage-info premium';
        const star = document.createTextNode('⭐ ');
        const strong = document.createElement('strong');
        strong.textContent = 'Premium';
        infoDiv.appendChild(star);
        infoDiv.appendChild(strong);
        infoDiv.appendChild(document.createTextNode(' - Unlimited'));
    } else {
        infoDiv.className = 'usage-info free';
        const status = canUseService();
        const lang = currentLang || 'ko';

        let message = '';
        if (lang === 'ko') {
            message = `무료 베타: 오늘 ${FREE_DAILY_LIMIT - status.remaining}/${FREE_DAILY_LIMIT}회 사용`;
        } else if (lang === 'en') {
            message = `Free Beta: ${FREE_DAILY_LIMIT - status.remaining}/${FREE_DAILY_LIMIT} uses today`;
        } else if (lang === 'ja') {
            message = `無料ベータ: 本日${FREE_DAILY_LIMIT - status.remaining}/${FREE_DAILY_LIMIT}回使用`;
        } else if (lang === 'es') {
            message = `Beta Gratis: ${FREE_DAILY_LIMIT - status.remaining}/${FREE_DAILY_LIMIT} usos hoy`;
        } else if (lang === 'zh') {
            message = `免费测试版: 今日已使用 ${FREE_DAILY_LIMIT - status.remaining}/${FREE_DAILY_LIMIT} 次`;
        }
        infoDiv.textContent = message;
    }

    statusEl.appendChild(infoDiv);
    statusEl.style.display = 'block';
}

// 업그레이드 모달 표시
function showUpgradeModal() {
    if (typeof updateModalLanguage === 'function') {
        updateModalLanguage();
    }
    const modal = document.getElementById('upgradeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

