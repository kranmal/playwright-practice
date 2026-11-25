# Playwright practice: manual QA to automation

UI tests (saucedemo.com) and API tests (jsonplaceholder) in TypeScript, using the Page Object pattern, with CI on GitHub Actions.

## Run it

```bash
npm install
npx playwright install chromium
npx playwright test            # everything
npx playwright test --ui       # interactive mode (best for learning)
npx playwright test --project=api
npx playwright show-report
```

## Layout

- `pages/` page objects (locators and actions in one place)
- `tests/ui/` browser tests: login, cart and checkout
- `tests/api/` API tests, the code equivalent of your Postman requests
- `.github/workflows/` runs the suite on every push

## Two-week plan

**Days 1-3: understand what's here.** Run with `--ui`, read each test, break one on purpose, and see what the failure looks like.

**Days 4-7: write your own.** Take 5 manual test cases from your last job (anonymised) and automate them against saucedemo.
Ideas: sorting products, the burger menu logout, `problem_user` bugs, `performance_glitch_user` timeouts.
Add a `CartPage` and `CheckoutPage` page object so the tests stop using raw locators.

**Days 8-10: API depth.** Add PUT, DELETE and query-param tests. Add a test that chains calls (create then fetch).
Add a negative test for each endpoint.

**Days 11-12: polish.** Push to GitHub, make sure CI is green, and write a short README section on what you tested and why.
Add an accessibility check with `@axe-core/playwright`.

**Days 13-14: apply.** Put the repo link at the top of your CV and LinkedIn.
Prepare to talk about test design (boundaries, error handling), not only tools.
