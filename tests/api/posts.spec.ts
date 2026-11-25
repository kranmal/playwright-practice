import { test, expect } from '@playwright/test';

// What you'd do in Postman, but as repeatable code.

test.describe('Posts API', () => {
  test('GET /posts/1 returns the expected shape', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 1, userId: expect.any(Number) });
    expect(typeof body.title).toBe('string');
  });

  test('GET /posts returns a list of 100', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.ok()).toBeTruthy();
    expect(await res.json()).toHaveLength(100);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const res = await request.post('/posts', {
      data: { title: 'hello', body: 'world', userId: 1 },
    });
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject({ title: 'hello', body: 'world' });
  });

  test('GET unknown post returns 404 (error handling)', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });
});
