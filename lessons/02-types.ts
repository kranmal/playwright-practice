// LESSON 2: types and interfaces (how you model test data)
// Run it:  node lessons/02-types.ts

// An interface describes the shape of an object. Great for test data.
interface TestUser {
  username: string;
  password: string;
  locked?: boolean; // ? = optional
}

const standard: TestUser = { username: 'standard_user', password: 'secret_sauce' };
const locked: TestUser = { username: 'locked_out_user', password: 'secret_sauce', locked: true };

// If you mistype a property, TypeScript underlines it in your editor BEFORE you run anything:
// const bad: TestUser = { usernmae: 'x', password: 'y' };  // error: "usernmae" doesn't exist

// A list of test data. This is the basis of data-driven testing.
const users: TestUser[] = [standard, locked];

for (const u of users) {
  console.log(`${u.username} locked? ${u.locked ?? false}`); // ?? = "if undefined, use this"
}

// Union types: a value can be one of a few exact options.
type SortOption = 'az' | 'za' | 'lohi' | 'hilo';
function sortLabel(option: SortOption): string {
  return `Sorting by ${option}`;
}
console.log(sortLabel('lohi'));
// sortLabel('random');  // error: not one of the allowed options

// reduce: combine a list into one value. Handy for totals.
const total = [10, 20, 30].reduce((sum, n) => sum + n, 0);
console.log(total); // 60

// DATA-DRIVEN TESTS in Playwright look like this (you'll write one in lesson 4):
//
//   for (const u of users) {
//     test(`login works for ${u.username}`, async ({ page }) => { ... });
//   }
//
// One loop produces one test per user. That's how you get lots of coverage cheaply.

// =====================================================
// EXERCISES
// =====================================================
const TODO: any = undefined;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`, ok ? '' : `(got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)})`);
}

// 1. Define an interface Product with a string `name` and a number `price`.
//    Replace this line with your interface:
interface Product {
  // TODO
  [key: string]: any;
}

// 2. Return the total price of all products (use reduce).
function totalPrice(items: Product[]): number {
  return TODO;
}

// 3. Return the names of products that cost less than `max`.
function namesUnder(items: Product[], max: number): string[] {
  return TODO;
}

// 4. Return the products' names sorted A to Z. Hint: [...names].sort()
//    (that's how you'd check "sort A-Z" works on the inventory page)
function sortedNames(items: Product[]): string[] {
  return TODO;
}

const items: Product[] = [
  { name: 'Backpack', price: 29.99 },
  { name: 'Bike Light', price: 9.99 },
  { name: 'Onesie', price: 7.99 },
];

console.log('\n--- Exercises ---');
check('totalPrice', Math.round(totalPrice(items) * 100) / 100, 47.97);
check('namesUnder 10', namesUnder(items, 10), ['Bike Light', 'Onesie']);
check('sortedNames', sortedNames(items), ['Backpack', 'Bike Light', 'Onesie']);
