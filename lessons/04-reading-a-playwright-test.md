# Lesson 4: reading and writing a Playwright test

Everything from lessons 1-3 shows up in a test. Here's one from this repo, line by line.

```ts
import { test, expect } from '@playwright/test';          // (A)
import { LoginPage } from '../../pages/LoginPage';        // (B)

test('wrong password shows an error', async ({ page }) => {   // (C)
  const login = new LoginPage(page);                          // (D)
  await login.goto();                                         // (E)
  await login.login('standard_user', 'wrong');
  await login.expectError('do not match');                    // (F)
});
```

| | What it is | Lesson |
|---|---|---|
| A | Importing two functions from the library | destructuring |
| B | Importing your own class from another file | |
| C | `test(name, arrow function)`. `async` because the browser is slow. `{ page }` is destructuring: Playwright hands you a fresh browser page | 1, 3 |
| D | Creating an object from a class (the Page Object) | |
| E | Every browser step has `await` | 3 |
| F | A web-first assertion. It retries until it passes or times out, so you don't need sleeps | |

## The rules that prevent 90% of flaky tests

1. **`await` every browser action and every `expect`.** Forget one and the test races ahead.
2. **Locate by what a user sees:** `getByRole('button', { name: 'Login' })`, `getByLabel(...)`, `getByText(...)`. Avoid `.div > span:nth-child(3)`.
3. **Never `waitForTimeout(3000)`.** Use an assertion; it waits for you.
4. **Each test stands alone.** No test should depend on another having run first.

## Your exercises

Create `tests/ui/sorting.spec.ts` and write these, running with `npx playwright test sorting --ui`.
Use the cart tests as a template (log in first in a `beforeEach`).

1. **Sort A to Z.** The sort dropdown is `page.locator('[data-test="product-sort-container"]')`.
   Pick `az`, read all names with `page.locator('.inventory_item_name').allTextContents()`,
   and assert the array equals a sorted copy of itself.
2. **Sort price low to high.** Pick `lohi`, read the prices (`.inventory_item_price`), turn
   "$29.99" into numbers (`parseFloat(text.replace('$', ''))`), and assert they're ascending.
3. **Data-driven.** Loop over `['az', 'za', 'lohi', 'hilo']` and make one test per option
   that checks the first product name is what you expect.
4. **Logout.** Open the burger menu, click Logout, and assert you're back on the login page.
5. **Stretch:** log in as `problem_user` and find a real bug. Write a test that fails because
   of it, and mark it `test.fail(...)` or `test.fixme(...)` with a comment explaining the defect.

When you're done, commit on a new branch and open a PR. Then ask me to review it.
