// upgrade.js - 업그레이드 버튼 처리

  // 업그레이드 모달 닫기
  function closeUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  // 결제 페이지로 이동
  async function startCheckout(plan = 'monthly', e = null) {
    const button = e ? e.target : null;
    let originalText = '';

    try {
      // 로딩 표시
      if (button) {
        originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
      }

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
      alert(t('alerts.checkoutError'));

      // 버튼 복구
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
    }
  }
  
  // 사용자 ID 가져오기 (usage.js의 쿠키 함수 사용)
  function getUserId() {
    let userId = getCookie('user_id');
    
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setCookie('user_id', userId, 365);
    }
    
    return userId;
  }
  
  // 페이지 로드 시 이벤트 리스너 등록
  document.addEventListener('DOMContentLoaded', () => {
    // 업그레이드 모달 관련
    const modal = document.getElementById('upgradeModal');
    const closeBtn = modal?.querySelector('.close');

    // 모달 닫기 버튼
    closeBtn?.addEventListener('click', closeUpgradeModal);

    // 모달 외부 클릭시 닫기
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeUpgradeModal();
      }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.style.display === 'flex') {
        closeUpgradeModal();
      }
    });

    // 월간 플랜 버튼
    const monthlyBtn = document.getElementById('monthlyBtn');
    monthlyBtn?.addEventListener('click', (e) => startCheckout('monthly', e));

    // 연간 플랜 버튼
    const annualBtn = document.getElementById('annualBtn');
    annualBtn?.addEventListener('click', (e) => startCheckout('annual', e));
  });