// upgrade.js - 업그레이드 버튼 처리

// 업그레이드 모달 열기
function openUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }
  
  // 업그레이드 모달 닫기
  function closeUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  // 결제 페이지로 이동
  async function startCheckout(plan = 'monthly') {
    try {
      // 로딩 표시
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = 'Loading...';
      button.disabled = true;
  
      // 체크아웃 생성
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan: plan,
          userId: getUserId() // 쿠키에서 사용자 ID 가져오기
        })
      });
  
      const data = await response.json();
  
      if (data.success && data.checkoutUrl) {
        // LemonSqueezy 결제 페이지로 이동
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Failed to create checkout');
      }
  
    } catch (error) {
      console.error('Checkout error:', error);
      alert('결제 페이지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      
      // 버튼 복구
      button.textContent = originalText;
      button.disabled = false;
    }
  }
  
  // 사용자 ID 가져오기 (usage.js와 동일한 방식)
  function getUserId() {
    let userId = getCookie('user_id');
    
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setCookie('user_id', userId, 365);
    }
    
    return userId;
  }
  
  // 쿠키 함수들 (usage.js에 이미 있으면 생략)
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }
  
  // 페이지 로드 시 이벤트 리스너 등록
  document.addEventListener('DOMContentLoaded', () => {
    // 업그레이드 모달 관련
    const modal = document.getElementById('upgradeModal');
    const closeBtn = modal?.querySelector('.modal-close');
  
    // 모달 닫기 버튼
    closeBtn?.addEventListener('click', closeUpgradeModal);
  
    // 모달 외부 클릭시 닫기
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeUpgradeModal();
      }
    });
  
    // 월간 플랜 버튼
    const monthlyBtn = document.getElementById('upgradeMonthly');
    monthlyBtn?.addEventListener('click', () => startCheckout('monthly'));
  
    // 연간 플랜 버튼
    const annualBtn = document.getElementById('upgradeAnnual');
    annualBtn?.addEventListener('click', () => startCheckout('annual'));
  
    // 일반 업그레이드 버튼 (모달 없이 바로)
    const quickUpgradeBtn = document.getElementById('quickUpgradeBtn');
    quickUpgradeBtn?.addEventListener('click', () => startCheckout('monthly'));
  });