import React from 'react';
import { render, screen } from '@testing-library/react';
import CongressionalGrant from '../app/CongressionalGrant';

it('Should display the conents of the app component', () => {
  const { container } = render(<CongressionalGrant />);
  container.querySelector('.appendix.top');
  expect(screen.getByTestId('custom-element')).toBeDefined();
});
