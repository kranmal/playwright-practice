import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Cart and checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('adding an item updates the cart badge', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('removing the item clears the badge', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('complete checkout end to end', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Zip/Postal Code').fill('AB1 2CD');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('checkout without details shows an error (error handling)', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
