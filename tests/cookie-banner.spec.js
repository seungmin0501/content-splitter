import { test, expect } from '@playwright/test';

test.describe('쿠키 배너 테스트', () => {
  test('처음 방문 시 쿠키 배너가 표시되는가', async ({ page }) => {
    // 쿠키 삭제
    await page.context().clearCookies();
    
    await page.goto('/');
    
    // 1초 대기 (배너가 1초 후 표시됨)
    await page.waitForTimeout(1500);
    
    const banner = page.locator('#cookieBanner');
    await expect(banner).toHaveClass(/show/);
  });

  test('동의 버튼 클릭 시 배너가 사라지는가', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    const banner = page.locator('#cookieBanner');
    const acceptBtn = page.locator('#acceptCookies');
    
    // 동의 버튼 클릭
    await acceptBtn.click();
    await page.waitForTimeout(500);
    
    // 배너 숨김
    await expect(banner).toHaveCSS('display', 'none');
  });

  test('동의 후 재방문 시 배너가 안 나타나는가', async ({ page }) => {
    // 첫 방문
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    // 동의
    await page.click('#acceptCookies');
    await page.waitForTimeout(500);
    
    // 재방문
    await page.reload();
    await page.waitForTimeout(1500);
    
    const banner = page.locator('#cookieBanner');
    
    // 배너가 show 클래스를 가지지 않음
    const classes = await banner.getAttribute('class');
    expect(classes).not.toContain('show');
  });
});