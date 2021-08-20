import 'regenerator-runtime/runtime';
import React from 'react';
import Home from '../containers/Home';
import { cleanup, render, screen } from '../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Home container is rendered correctly', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('Should display the contents of the home container', () => {
    expect(screen.getByTestId('home-content')).toBeDefined();
  });
});

module.exports = {};
