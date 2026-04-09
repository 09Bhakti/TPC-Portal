import { test, expect } from '@playwright/test';

test('student can register and verify OTP with Supabase backend', async ({ page }) => {
  const email = `ui.test.${Date.now()}@example.com`;

  await page.goto('/register');

  await page.getByPlaceholder('John Doe').fill('UI Test Student');
  await page.getByPlaceholder('you@university.edu').fill(email);
  await page.getByPlaceholder('Min. 6 characters').fill('Password@123');
  await page.getByPlaceholder('Re-enter your password').fill('Password@123');
  await page.locator('select').selectOption('STUDENT');
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByText('OTP sent to your email. Please check your inbox.')).toBeVisible();

  await page.locator('input').first().click();
  await page.keyboard.type('A1B2C3');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
});
