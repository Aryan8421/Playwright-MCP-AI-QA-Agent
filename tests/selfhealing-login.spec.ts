import { expect, Locator, Page, test } from '@playwright/test';

async function firstVisible(
  candidates: Locator[],
  description: string,
): Promise<Locator> {
  for (const candidate of candidates) {
    try {
      await candidate.first().waitFor({ state: 'visible', timeout: 1_000 });
      return candidate.first();
    } catch (error) {
      if (!(error instanceof Error) || error.name !== 'TimeoutError') {
        throw error;
      }
    }
  }

  throw new Error(`Could not find a visible ${description} using any fallback`);
}

async function getUsernameField(page: Page): Promise<Locator> {
  return firstVisible(
    [
      page.getByRole('textbox', { name: 'Username', exact: true }),
      page.locator('input[placeholder="Username"]'),
      page.getByLabel('Username', { exact: true }),
      page.locator('form input[type="text"]').first(),
    ],
    'username field',
  );
}

async function getPasswordField(page: Page): Promise<Locator> {
  return firstVisible(
    [
      page.getByRole('textbox', { name: 'Password', exact: true }),
      page.locator('input[placeholder="Password"]'),
      page.getByLabel('Password', { exact: true }),
      page.locator('input[type="password"]'),
      page.locator('form input').nth(1),
    ],
    'password field',
  );
}

async function getLoginButton(page: Page): Promise<Locator> {
  return firstVisible(
    [
      page.getByRole('button', { name: 'Login', exact: true }),
      page.getByText('Login', { exact: true }),
      page.locator('button[type="submit"]'),
      page.locator('input[type="submit"]'),
    ],
    'login button',
  );
}

test('logs in, verifies the dashboard, and logs out', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');

  await (await getUsernameField(page)).fill('Admin');
  await (await getPasswordField(page)).fill('admin123');
  await (await getLoginButton(page)).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  const userMenu = await firstVisible(
    [
      page.getByRole('banner').getByRole('img', { name: 'profile picture' }),
      page.getByRole('banner').getByText('John Doe', { exact: true }),
    ],
    'user menu control',
  );
  await userMenu.click();

  await firstVisible(
    [
      page.getByRole('menuitem', { name: 'Logout', exact: true }),
      page.getByText('Logout', { exact: true }),
      page.locator('a[href*="logout"]'),
    ],
    'logout option',
  ).then((logoutOption) => logoutOption.click());

  await expect(page).toHaveURL(/auth\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
