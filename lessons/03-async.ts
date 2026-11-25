// LESSON 3: async / await (the thing that trips up every new Playwright user)
// Run it:  node lessons/03-async.ts
//
// Browser actions take time (loading, clicking, waiting). In JavaScript those are
// "Promises": a promise of a result later. `await` means "pause here until it's done".
// If you forget `await`, your test races ahead of the browser and fails randomly.

// A fake page so you can see the idea without a browser.
class FakePage {
  log: string[] = [];

  private async delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async goto(url: string) {
    await this.delay(50);
    this.log.push(`goto ${url}`);
  }
  async fill(field: string, value: string) {
    await this.delay(20);
    this.log.push(`fill ${field}=${value}`);
  }
  async click(button: string) {
    await this.delay(20);
    this.log.push(`click ${button}`);
  }
}

// Rule 1: a function that uses `await` must be marked `async`.
async function demo() {
  const page = new FakePage();

  // WITH await: steps run in order.
  await page.goto('/');
  await page.fill('username', 'standard_user');
  await page.click('Login');
  console.log('with await   :', page.log);

  // WITHOUT await: the steps start, but we read the log before they finish. Log is empty!
  const racy = new FakePage();
  racy.goto('/');
  racy.fill('username', 'standard_user');
  racy.click('Login');
  console.log('without await:', racy.log); // []   <- the classic bug
}

// Rule 2: errors in async code are caught with try/catch.
async function mightFail() {
  throw new Error('element not found');
}
async function safe() {
  try {
    await mightFail();
  } catch (e) {
    console.log('caught:', (e as Error).message);
  }
}

// Rule 3: run independent things at the same time with Promise.all.
async function parallel() {
  const a = new FakePage();
  const b = new FakePage();
  await Promise.all([a.goto('/one'), b.goto('/two')]);
  console.log('parallel:', a.log, b.log);
}

// =====================================================
// EXERCISES
// =====================================================
const TODO: any = undefined;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`, ok ? '' : `(got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)})`);
}

// 1. Using the page, do these steps IN ORDER: goto '/', fill 'username' with `user`,
//    fill 'password' with `pass`, click 'Login'. Remember: async + await on every step.
async function login(page: FakePage, user: string, pass: string): Promise<void> {
  // TODO
}

// 2. Same as login, but return true if it worked and false if any step threw an error.
//    Hint: try { ... return true } catch { return false }
async function tryLogin(page: FakePage, user: string, pass: string): Promise<boolean> {
  return TODO;
}

async function main() {
  await demo();
  await safe();
  await parallel();

  console.log('\n--- Exercises ---');
  const p1 = new FakePage();
  await login(p1, 'standard_user', 'secret_sauce');
  check('login steps', p1.log, [
    'goto /',
    'fill username=standard_user',
    'fill password=secret_sauce',
    'click Login',
  ]);

  const p2 = new FakePage();
  check('tryLogin returns true', await tryLogin(p2, 'a', 'b'), true);

  const broken = new FakePage();
  broken.click = async () => {
    throw new Error('boom');
  };
  check('tryLogin returns false on error', await tryLogin(broken, 'a', 'b'), false);
}

main();
