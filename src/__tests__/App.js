import 'regenerator-runtime/runtime';

const sum = (x, y) => {
  return x + y;
}

test('App loads', () => {
  expect(sum(1, 2)).toBe(3);
} )

module.exports = {};
