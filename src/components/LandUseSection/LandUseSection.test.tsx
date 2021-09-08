import React from 'react';
import LandUseSection from './LandUseSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import CustomSearch from '../../containers/CustomSearchContainer/CustomSearch';

afterEach(() => {
  cleanup();
});

describe('Land use section is rendered correctly', () => {
  beforeEach(() => {
    render(<LandUseSection/>);
  });

  test('Should display the group of checkboxes', () => {
    expect(
      screen.getByRole('group', { name: 'search-page.filter-by-land-use' })
    ).toBeDefined();
  });
});
// test('adds 1 + 2 to equal 3', () => {
//   expect(1 + 2).toBe(3);
// });