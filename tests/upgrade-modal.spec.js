import { test, expect } from '@playwright/test';

test.describe('업그레이드 모달 테스트', () => {
  test('모달이 정상적으로 열리는가', async ({ page }) => {
    await page.goto('/');
    
    // 모달 직접 열기 (localStorage 조작 대신)
    await page.evaluate(() => {
      window.showUpgradeModal();
    });
    
    await page.waitForTimeout(500);
    
    const modal = page.locator('#upgradeModal');
    await expect(modal).toBeVisible();
  });

  test('X 버튼으로 모달이 닫히는가', async ({ page }) => {
    await page.goto('/');
    
    // 모달 강제 열기
    await page.evaluate(() => {
      document.getElementById('upgradeModal').style.display = 'flex';
    });
    
    const modal = page.locator('#upgradeModal');
    await expect(modal).toBeVisible();
    
    // X 버튼 클릭
    await page.click('#upgradeModal .close');

    await page.waitForTimeout(500);
    
    await expect(modal).toHaveCSS('display', 'none');
  });

  test('언어 변경 시 모달 텍스트가 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    // 모달 강제 열기
    await page.evaluate(() => {
      document.getElementById('upgradeModal').style.display = 'flex';
    });
    
    // 한국어 확인
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(500);
    await expect(page.locator('#modalTitle')).toContainText('Premium');
    
    // 영어 확인
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(500);
    await expect(page.locator('#monthlyBtn')).toContainText('free trial');
  });

  test('Monthly와 Annual 플랜이 모두 표시되는가', async ({ page }) => {
    await page.goto('/');
    
    await page.evaluate(() => {
      document.getElementById('upgradeModal').style.display = 'flex';
    });
    
    await expect(page.locator('#monthlyTitle')).toBeVisible();
    await expect(page.locator('#annualTitle')).toBeVisible();
    await expect(page.locator('#bestValueBadge')).toBeVisible();
  });
});