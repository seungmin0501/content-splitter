// premium.js - Lemon Squeezy 결제 연동 및 프리미엄 관리

// Lemon Squeezy 결제 페이지로 이동
async function createCheckout() {
    try {
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                variantId: '1227112',
                // 사용자 정보 (선택사항)
                email: localStorage.getItem('user_email') || ''
            })
        });

        const data = await response.json();

        if (data.success && data.checkoutUrl) {
            // Lemon Squeezy 결제 페이지로 이동
            window.location.href = data.checkoutUrl;
        } else {
            throw new Error(data.error || 'Checkout creation failed');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('결제 페이지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
}

// 결제 성공 후 돌아왔을 때 처리
function handlePaymentReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const licenseKey = urlParams.get('license_key');

    if (success === 'true' && licenseKey) {
        // 라이선스 키 저장
        activatePremium(licenseKey);
        
        // URL 파라미터 제거 (깔끔하게)
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // 축하 메시지
        showWelcomeMessage();
    }
}

// 프리미엄 활성화
function activatePremium(licenseKey) {
    localStorage.setItem('premium_license', licenseKey);
    localStorage.setItem('premium_activated_at', new Date().toISOString());
    
    // 쿠키에도 저장 (하위 호환성)
    setCookie('premium_code', licenseKey, 365);
    
    // UI 업데이트
    updateUsageDisplay();
}

// 프리미엄 상태 확인 (개선된 버전)
function checkPremiumStatus() {
    const licenseKey = localStorage.getItem('premium_license');
    
    if (!licenseKey) {
        return { isPremium: false, licenseKey: null };
    }
    
    // 실제 운영에서는 서버에서 라이선스 검증 필요
    // 지금은 간단히 존재 여부만 확인
    return {
        isPremium: true,
        licenseKey: licenseKey,
        activatedAt: localStorage.getItem('premium_activated_at')
    };
}

// 프리미엄 취소/환불 처리
function deactivatePremium() {
    localStorage.removeItem('premium_license');
    localStorage.removeItem('premium_activated_at');
    document.cookie = 'premium_code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // UI 업데이트
    updateUsageDisplay();
}

// 환영 메시지 표시
function showWelcomeMessage() {
    const lang = currentLang || 'ko';
    
    const messages = {
        ko: '🎉 프리미엄 구독이 활성화되었습니다!\n이제 무제한으로 콘텐츠를 변환하실 수 있어요!',
        en: '🎉 Premium subscription activated!\nYou can now convert unlimited content!',
        ja: '🎉 プレミアム購読が有効になりました！\n無制限でコンテンツを変換できます！',
        es: '🎉 ¡Suscripción Premium activada!\n¡Ahora puedes convertir contenido ilimitado!'
    };
    
    alert(messages[lang] || messages.ko);
}

// 페이지 로드 시 결제 성공 확인
document.addEventListener('DOMContentLoaded', () => {
    handlePaymentReturn();
});

// usage.js의 isPremium 함수 개선 (기존 함수 대체)
function isPremium() {
    const status = checkPremiumStatus();
    return status.isPremium;
}
