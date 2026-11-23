import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

type LoginCase = {
  username: string;
  password: string;
  expected: string;
};

function readLoginData(): LoginCase[] {
  const csvPath = path.join(__dirname, '..', 'test-data', 'loginData.csv');
  const lines = fs
    .readFileSync(csvPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  const headers = lines.shift()?.split(',').map((header) => header.trim());
  if (
    !headers?.includes('Username') ||
    !headers.includes('Password') ||
    !headers.includes('Expected')
  ) {
    throw new Error(
      'loginData.csv must contain Username, Password, and Expected columns',
    );
  }

  const usernameIndex = headers.indexOf('Username');
  const passwordIndex = headers.indexOf('Password');
  const expectedIndex = headers.indexOf('Expected');

  return lines.map((line) => {
    const columns = line.split(',').map((column) => column.trim());
    return {
      username: columns[usernameIndex],
      password: columns[passwordIndex],
      expected: columns[expectedIndex],
    };
  });
}

const loginCases = readLoginData();

for (const loginCase of loginCases) {
  test(`logs in with ${loginCase.username} and verifies ${loginCase.expected}`, async ({
    page,
  }) => {
    try {
      await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      );

      await page
        .getByRole('textbox', { name: 'Username' })
        .fill(loginCase.username);
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill(loginCase.password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (loginCase.expected === 'Dashboard') {
        await expect(page).toHaveURL(/dashboard/);
        await expect(
          page.getByRole('heading', { name: 'Dashboard' }),
        ).toBeVisible();
      } else if (loginCase.expected === 'Invalid credentials') {
        await expect(page.getByRole('alert')).toContainText(
          'Invalid credentials',
        );
        await expect(page).toHaveURL(/auth\/login/);
      } else {
        throw new Error(`Unsupported expected result: ${loginCase.expected}`);
      }

      console.log(`PASS: ${loginCase.username} -> ${loginCase.expected}`);
    } catch (error) {
      console.log(`FAIL: ${loginCase.username} -> ${loginCase.expected}`);
      throw error;
    }
  });
}
