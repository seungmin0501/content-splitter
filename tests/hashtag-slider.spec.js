import { test, expect } from '@playwright/test';

test.describe('해시태그 슬라이더 테스트', () => {
  test('슬라이더 기본값이 10인가', async ({ page }) => {
    await page.goto('/');
    
    const slider = page.locator('#hashtagCount');
    const value = await slider.inputValue();
    expect(value).toBe('10');
    
    const display = page.locator('#hashtagValue');
    await expect(display).toContainText('10');
  });

  test('슬라이더 값 변경 시 표시가 업데이트되는가', async ({ page }) => {
    await page.goto('/');
    
    const slider = page.locator('#hashtagCount');
    const display = page.locator('#hashtagValue');
    
    // 값을 5로 변경
    await slider.fill('5');
    await expect(display).toContainText('5');
    
    // 값을 20으로 변경
    await slider.fill('20');
    await expect(display).toContainText('20');
  });

  test('언어 변경 시 단위가 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    const display = page.locator('#hashtagValue');
    
    // 한국어: "10개"
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(500);
    await expect(display).toContainText('개');
    
    // 영어: "10" (단위 없음)
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(500);
    const textEn = await display.textContent();
    expect(textEn).toBe('10');
    
    // 일본어: "10個"
    await page.selectOption('#languageSelect', 'ja');
    await page.waitForTimeout(500);
    await expect(display).toContainText('個');
  });

  test('슬라이더 최소값이 0, 최대값이 30인가', async ({ page }) => {
    await page.goto('/');
    
    const slider = page.locator('#hashtagCount');
    
    const min = await slider.getAttribute('min');
    const max = await slider.getAttribute('max');
    
    expect(min).toBe('0');
    expect(max).toBe('30');
  });
});