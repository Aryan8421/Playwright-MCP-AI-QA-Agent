import { test, expect } from '@playwright/test';

test('creates a Buzz post and verifies it appears in the recent feed', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Buzz' }).click();
  await expect(page).toHaveURL(/buzz\/viewBuzz/);
  await expect(page.getByText('Buzz Newsfeed')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Most Recent Posts' }),
  ).toBeVisible();

  const postText = `Excited for testing! ${Date.now()}`;
  const postTextbox = page.getByRole('textbox', { name: "What's on your mind?" });
  await expect(postTextbox).toBeVisible();
  await postTextbox.fill(postText);
  await page.getByRole('button', { name: 'Post', exact: true }).click();

  await page.getByRole('button', { name: /Most Recent Posts/ }).click();

  const newestPost = page
    .locator('.orangehrm-buzz-newsfeed-posts > .oxd-grid-item')
    .first()
    .getByText(postText, { exact: true });
  await expect(newestPost).toBeVisible();
});
