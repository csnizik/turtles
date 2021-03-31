import 'regenerator-runtime/runtime';
import React from 'react';
import Home from '../containers/Home'
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('Should display the conents of the home component', () => {
  const { container } = render(
    <Router>
      <Home />
    </Router>
  );
  container.querySelector('.home');
  expect(screen.getByText('Access Reports')).toBeDefined();
})

module.exports = {};
