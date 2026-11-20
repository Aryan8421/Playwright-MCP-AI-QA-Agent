import { test, expect } from '@playwright/test';

test('adds an employee and verifies the employee profile', async ({ page }) => {
  // Step 1: Navigate to the OrangeHRM demo site.
  await page.goto('https://opensource-demo.orangehrmlive.com');

  // Step 2: Log in with the provided credentials and wait for the Dashboard.
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Step 3: Navigate to the PIM module using the left sidebar.
  await page.getByRole('link', { name: 'PIM' }).click();

  // Step 4: Click Add to open the Add Employee form.
  await page.getByRole('button', { name: 'Add' }).click();

  // Step 5: Enter the employee's first and last names.
  await page.getByRole('textbox', { name: 'First Name' }).fill('John123');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe456');

  // Use a unique ID because the shared demo may generate an ID that already exists.
  await page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Employee Id' })
    .getByRole('textbox')
    .fill(Date.now().toString().slice(-10));

  // Step 6: Save the new employee.
  await page.getByRole('button', { name: 'Save' }).click();

  // Step 7: Verify that the employee profile page is displayed.
  await expect(page).toHaveURL(/pim\/viewPersonalDetails/);
  await expect(
    page.getByRole('heading', { name: 'Personal Details' }),
  ).toBeVisible();

  // Step 8: Confirm that the employee's full name is shown at the top.
  await expect(
    page.getByRole('heading', { name: 'John123 Doe456' }),
  ).toBeVisible();
});
