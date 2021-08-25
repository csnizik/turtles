import React from 'react';
import LandUseSection from './LandUseSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Land use section is rendered correctly', () => {
  beforeEach(() => {
    render(<LandUseSection />);
  });

  test('Should display the group of checkboxes', () => {
    expect(
      screen.getByRole('group', { name: 'Filter By Land Use' })
    ).toBeDefined();
  });
});
