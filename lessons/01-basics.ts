// LESSON 1: variables, functions, arrays, objects
// Run it:  node lessons/01-basics.ts
// Read top to bottom, then do the exercises at the bottom.

// ---------- Variables ----------
const baseUrl = 'https://www.saucedemo.com'; // const = can never be reassigned (use this by default)
let cartCount = 0; // let = can change
cartCount = cartCount + 1;

// Types go after a colon. TypeScript usually infers them, so you can leave them off.
const username: string = 'standard_user';
const price: number = 29.99;
const isLocked: boolean = false;

// Template strings use backticks and ${...}. You'll build URLs and messages with these.
console.log(`Logging in as ${username} at ${baseUrl}`);

// ---------- Functions ----------
function greet(name: string): string {
  return `Hello ${name}`;
}

// Arrow function: same idea, shorter. Every Playwright test is an arrow function.
const double = (n: number): number => n * 2;

console.log(greet('Ketan'), double(21));

// ---------- Arrays ----------
const products = ['Backpack', 'Bike Light', 'Onesie'];
products.push('Jacket');
console.log(products.length); // 4
console.log(products[0]); // 'Backpack' (arrays start at 0)

for (const p of products) {
  console.log('Product:', p);
}

// map = transform every item. filter = keep only some items.
const shouting = products.map((p) => p.toUpperCase());
const bProducts = products.filter((p) => p.startsWith('B'));
console.log(shouting, bProducts);

// ---------- Objects ----------
const user = { name: 'standard_user', password: 'secret_sauce' };
console.log(user.name);

// Destructuring: pull properties out into variables.
// This is exactly what `async ({ page }) => {...}` does in Playwright:
// it pulls `page` out of the object Playwright hands your test.
const { name, password } = user;
console.log(name, password);

// =====================================================
// EXERCISES: replace the TODO lines, then re-run the file.
// =====================================================
const TODO: any = undefined;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`, ok ? '' : `(got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)})`);
}

// 1. Return true if the price is more than 20.
function isExpensive(price: number): boolean {
  return TODO;
}

// 2. Return only the prices below 20 (use filter).
function cheapPrices(prices: number[]): number[] {
  return TODO;
}

// 3. Return "First Last" using a template string.
function fullName(first: string, last: string): string {
  return TODO;
}

// 4. Return the product names in lowercase (use map).
function lowerNames(names: string[]): string[] {
  return TODO;
}

console.log('\n--- Exercises ---');
check('isExpensive(29.99)', isExpensive(29.99), true);
check('isExpensive(9.99)', isExpensive(9.99), false);
check('cheapPrices', cheapPrices([29.99, 9.99, 15.99, 49.99]), [9.99, 15.99]);
check('fullName', fullName('Test', 'User'), 'Test User');
check('lowerNames', lowerNames(['Backpack', 'Onesie']), ['backpack', 'onesie']);
