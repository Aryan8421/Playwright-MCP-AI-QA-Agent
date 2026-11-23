import { test, expect } from '@playwright/test';

const loginCases = [
  {
    username: 'Admin',
    password: 'admin123',
    expected: 'dashboard',
  },
  {
    username: 'fakeuser',
    password: 'fakepass',
    expected: 'invalid credentials',
  },
  {
    username: 'ESSUser1',
    password: 'ess123',
    expected: 'invalid credentials',
  },
] as const;

for (const loginCase of loginCases) {
  test(`logs in with ${loginCase.username} and verifies ${loginCase.expected}`, async ({
    page,
  }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    await page.getByRole('textbox', { name: 'Username' }).fill(loginCase.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(loginCase.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (loginCase.expected === 'dashboard') {
      await expect(page).toHaveURL(/dashboard/);
      await expect(
        page.getByRole('heading', { name: 'Dashboard' }),
      ).toBeVisible();

      await page
        .getByRole('banner')
        .getByRole('img', { name: 'profile picture' })
        .click();
      await page.getByRole('menuitem', { name: 'Logout' }).click();

      await expect(page).toHaveURL(/auth\/login/);
      await expect(
        page.getByRole('heading', { name: 'Login' }),
      ).toBeVisible();
    } else {
      await expect(page.getByRole('alert')).toContainText('Invalid credentials');
      await expect(page).toHaveURL(/auth\/login/);
    }
  });
}
