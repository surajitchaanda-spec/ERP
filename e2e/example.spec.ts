import { test, expect } from '@playwright/test';

test.describe('ERP onboarding flow', () => {
  test('displays the login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });
});
