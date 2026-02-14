import { test, expect } from '@playwright/test';

test.describe('페이지 로드 테스트', () => {
  test('기본 요소가 모두 표시되는가', async ({ page }) => {
    await page.goto('/');
    
    // 헤더 확인
    await expect(page.locator('h1')).toContainText('ContentSplitter');
    
    // 언어 선택 확인
    await expect(page.locator('#languageSelect')).toBeVisible();
    
    // 입력창 확인
    await expect(page.locator('#contentInput')).toBeVisible();
    
    // 변환 버튼 확인
    await expect(page.locator('#convertBtn')).toBeVisible();
    
    // 플랫폼 체크박스 확인
    await expect(page.locator('input[value="instagram"]')).toBeVisible();
    await expect(page.locator('input[value="twitter"]')).toBeVisible();
    await expect(page.locator('input[value="linkedin"]')).toBeVisible();
    await expect(page.locator('input[value="facebook"]')).toBeVisible();
  });

  test('콘솔 에러가 없는가', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // 2초 대기 (모든 스크립트 로드)
    await page.waitForTimeout(2000);
    
    expect(errors).toHaveLength(0);
  });
});