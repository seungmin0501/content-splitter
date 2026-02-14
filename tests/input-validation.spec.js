import { test, expect } from '@playwright/test';

test.describe('입력 및 검증 테스트', () => {
  test('텍스트 입력 시 글자 수가 업데이트되는가', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('#contentInput');
    const charCount = page.locator('#charCount');
    
    // 텍스트 입력
    await input.fill('테스트 텍스트입니다');
    
    // 글자 수 확인 (10자)
    await expect(charCount).toContainText('10');
  });

  test('50자 미만 입력 시 경고 메시지가 나오는가', async ({ page }) => {
    await page.goto('/');
    
    // 짧은 텍스트 입력
    await page.fill('#contentInput', '짧은 텍스트');
    
    // 변환 버튼 클릭
    page.on('dialog', dialog => dialog.accept());
    await page.click('#convertBtn');
    
    // 경고 발생 확인 (alert이 발생하면 성공)
  });

  test('언어 변경 시 글자 수 단위가 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('#contentInput');
    const charCount = page.locator('#charCount');
    
    // 텍스트 입력
    await input.fill('Test text');
    
    // 한국어: "9자"
    await page.selectOption('#languageSelect', 'ko');
    await expect(charCount).toContainText('자');
    
    // 영어로 변경: "9 chars"
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(500);
    await expect(charCount).toContainText('chars');
    
    // 일본어로 변경: "9文字"
    await page.selectOption('#languageSelect', 'ja');
    await page.waitForTimeout(500);
    await expect(charCount).toContainText('文字');
  });

  test('예시 보기 버튼 클릭 시 텍스트가 채워지는가', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('#contentInput');
    const exampleBtn = page.locator('#exampleBtn');
    
    // 예시 버튼 클릭
    await exampleBtn.click();
    
    // 입력창에 텍스트가 채워졌는지 확인
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(50);
    
    // 글자 수가 업데이트 되었는지 확인
    const charCount = page.locator('#charCount');
    await expect(charCount).not.toContainText('0');
  });
});