import { test, expect } from '@playwright/test';

test('displays the PIM employee information page and logs out', async ({ page }) => {
  // Step 1: Navigate to the OrangeHRM demo site.
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // Step 2: Log in with the provided credentials.
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 3: Wait for the Dashboard to be visible after login.
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Step 4: Open the PIM page from the left sidebar.
  await page.getByRole('link', { name: 'PIM' }).click();

  // Step 5: Verify that the Employee Information page is displayed.
  await expect(
    page.getByRole('heading', { name: 'Employee Information' }),
  ).toBeVisible();

  // Step 6: Verify that the Add and Search buttons are visible.
  await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

  // Step 7: Open the user profile menu.
  await page
    .getByRole('banner')
    .getByRole('img', { name: 'profile picture' })
    .click();

  // Step 8: Select Logout from the profile menu.
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Step 9: Verify that the login page is displayed again.
  await expect(page).toHaveURL(/auth\/login/);
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});
