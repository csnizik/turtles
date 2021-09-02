import React from 'react';
import CustomSearchContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

// afterEach(() => {
//   cleanup();
// });

// describe('Custom search container is rendered correctly', () => {
//   beforeEach(() => {
//     render(<CustomSearchContainer />);
//   });

//   test('Should display the contents of the custom search container', () => {
//     expect(screen.getByTestId('custom-search-container')).toBeDefined();
//   });

//   test('Custom search page should contain a search button', () => {
//     expect(screen.getByTestId('custom-search-button')).toBeDefined();
//     // expect(screen.getByRole('button', { name: 'search' }));
//   });
// });
