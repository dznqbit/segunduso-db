import { hello } from './scraper';

test('hello works', () => {
  expect(hello()).toBe('hello');
});

test('failing test', () => {
  expect('blah').toBe('hello');
});
