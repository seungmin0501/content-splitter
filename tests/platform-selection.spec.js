import { test, expect } from '@playwright/test';

test.describe('플랫폼 선택 테스트', () => {
  test('모든 체크박스가 기본으로 체크되어 있는가', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('input[value="instagram"]')).toBeChecked();
    await expect(page.locator('input[value="twitter"]')).toBeChecked();
    await expect(page.locator('input[value="linkedin"]')).toBeChecked();
    await expect(page.locator('input[value="facebook"]')).toBeChecked();
  });

  test('체크박스 클릭 시 체크 해제되는가', async ({ page }) => {
    await page.goto('/');
    
    const twitterCheckbox = page.locator('input[value="twitter"]');
    
    // 체크 해제
    await twitterCheckbox.click();
    await expect(twitterCheckbox).not.toBeChecked();
    
    // 다시 체크
    await twitterCheckbox.click();
    await expect(twitterCheckbox).toBeChecked();
  });

  test('모든 체크박스 해제 시 경고 메시지가 나오는가', async ({ page }) => {
    await page.goto('/');
    
    // 모든 체크박스 해제
    await page.click('input[value="instagram"]');
    await page.click('input[value="twitter"]');
    await page.click('input[value="linkedin"]');
    await page.click('input[value="facebook"]');
    
    // 충분한 텍스트 입력
    await page.fill('#contentInput', '테스트 텍스트입니다. 이것은 50자 이상의 충분히 긴 텍스트입니다. 플랫폼 선택 경고를 테스트하기 위한 내용입니다.');
    
    // 경고 다이얼로그 처리
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('platform');
      dialog.accept();
    });
    
    await page.click('#convertBtn');
  });
});