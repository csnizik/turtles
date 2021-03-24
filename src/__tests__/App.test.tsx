import React from 'react';
import { render, screen } from '@testing-library/react';
import CongressionalGrant from '../app/CongressionalGrant';
import { act } from "react-dom/test-utils"

it('Should display the conents of the app component', async () => {
  const { container } = await render(<CongressionalGrant />);
  container.querySelector('.appendix.top');
  await expect(screen.getByTestId('custom-element')).toBeDefined();
});
