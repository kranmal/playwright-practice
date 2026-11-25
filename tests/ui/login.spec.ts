import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// Manual test case -> automated. Each test mirrors the steps you'd write in Zephyr/TestRail.

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('valid user can log in and sees the product list', async ({ page }) => {
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('locked out user sees an error', async () => {
    await login.login('locked_out_user', 'secret_sauce');
    await login.expectError('locked out');
  });

  test('wrong password shows an error', async () => {
    await login.login('standard_user', 'wrong');
    await login.expectError('do not match');
  });

  test('empty username shows a required error (boundary)', async () => {
    await login.login('', 'secret_sauce');
    await login.expectError('Username is required');
  });

  test('empty password shows a required error (boundary)', async () => {
    await login.login('standard_user', '');
    await login.expectError('Password is required');
  });
});
