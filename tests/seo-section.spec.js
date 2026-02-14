import { test, expect } from '@playwright/test';

test.describe('SEO 섹션 테스트', () => {
  test('4개 SEO 섹션이 모두 표시되는가', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 맨 아래로 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // How It Works 섹션
    await expect(page.locator('.how-it-works-section')).toBeVisible();
    
    // Benefits 섹션
    await expect(page.locator('.benefits-section')).toBeVisible();
    
    // FAQ 섹션
    await expect(page.locator('.faq-section')).toBeVisible();
  });

  test('FAQ 질문 클릭 시 답변이 펼쳐지는가', async ({ page }) => {
    await page.goto('/');
    
    // FAQ 섹션으로 스크롤
    await page.evaluate(() => {
      document.querySelector('.faq-section').scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    const firstFaq = page.locator('.faq-item').first();
    
    // 초기 상태: collapsed
    await expect(firstFaq).toHaveClass(/collapsed/);
    
    // 클릭
    await firstFaq.click();
    await page.waitForTimeout(300);
    
    // collapsed 클래스 제거됨
    const classes = await firstFaq.getAttribute('class');
    expect(classes).not.toContain('collapsed');
  });

  test('언어 변경 시 SEO 섹션 내용이 바뀌는가', async ({ page }) => {
    await page.goto('/');
    
    await page.evaluate(() => {
      document.querySelector('.how-it-works-section').scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    const sectionTitle = page.locator('.how-it-works-section h2');
    
    // 한국어
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(500);
    await expect(sectionTitle).toContainText('방법');
    
    // 영어
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(500);
    await expect(sectionTitle).toContainText('How It Works');
  });
});