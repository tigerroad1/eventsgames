
import { test, expect } from '@playwright/test';

test('verify magic build dashboard', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:5173');

  // Check if main elements are visible
  await expect(page.getByText('Magic Architect')).toBeVisible();
  await expect(page.getByText('Active Projects')).toBeVisible();
  await expect(page.getByText('System Journal')).toBeVisible();

  // Type in chat
  const chatInput = page.getByPlaceholder('Type your instructions...');
  await chatInput.fill('Create a new react project');
  await page.getByRole('button').filter({ has: page.locator('svg') }).click();

  // Wait for response (mocked delay is 1s)
  await page.waitForTimeout(1500);

  // Take screenshot
  await page.screenshot({ path: 'verification.png', fullPage: true });
});
