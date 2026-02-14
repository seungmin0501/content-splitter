import { test, expect } from '@playwright/test';

test.describe('언어 변경 테스트', () => {
  test('영어로 변경 시 UI가 영어로 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    // 영어로 변경
    await page.selectOption('#languageSelect', 'en');
    
    // 1초 대기 (언어 변경 적용)
    await page.waitForTimeout(1000);
    
    // 변환 버튼 텍스트 확인
    const convertBtn = page.locator('#convertBtn');
    await expect(convertBtn).toContainText('Convert');
    
    // 플랫폼 레이블 확인
    const instagramLabel = page.locator('label:has(input[value="instagram"])');
    await expect(instagramLabel).toContainText('Instagram');
  });

  test('일본어로 변경 시 UI가 일본어로 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    await page.selectOption('#languageSelect', 'ja');
    await page.waitForTimeout(1000);
    
    const convertBtn = page.locator('#convertBtn');
    await expect(convertBtn).toContainText('変換');
  });

  test('스페인어로 변경 시 UI가 스페인어로 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    await page.selectOption('#languageSelect', 'es');
    await page.waitForTimeout(1000);
    
    const convertBtn = page.locator('#convertBtn');
    await expect(convertBtn).toContainText('Convertir');
  });

  test('한국어로 돌아오는가', async ({ page }) => {
    await page.goto('/');
    
    // 영어로 변경
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(500);
    
    // 다시 한국어로
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(500);
    
    const convertBtn = page.locator('#convertBtn');
    await expect(convertBtn).toContainText('변환하기');
  });
});