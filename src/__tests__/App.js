import 'regenerator-runtime/runtime';
import React from 'react';
import CongressionalGrant from '../app/CongressionalGrant'
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

// const sum = (x, y) => {
//   return x + y;
// }
//
// test('App loads', () => {
//   expect(sum(1, 2)).toBe(3);
// } )

test('Should display the conents of the app component', async () => {
  const { container } = await render(<CongressionalGrant />);
  container.querySelector('.appendix.top');
  await expect(screen.getByTestId('custom-element')).toBeDefined();
})

module.exports = {};
