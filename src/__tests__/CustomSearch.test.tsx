import React from 'react';
import CustomSearchContainer from '../containers/CustomSearchContainer';
import { cleanup, render, screen } from '../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Custom search container is rendered correctly', () => {
  beforeEach(() => {
    render(<CustomSearchContainer />);
  });

  test('Should display the contents of the custom search container', () => {
    expect(screen.getByTestId('custom-search-container')).toBeDefined();
  });

  test('Custom search page should contain a search button', () => {
    expect(screen.getByRole('button', { name: 'search' }));
  });
});
