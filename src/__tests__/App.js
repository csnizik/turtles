import 'regenerator-runtime/runtime';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from '../containers/Home';

test('Should display the contents of the home component', () => {
  const { container } = render(
    <Router>
      <Home />
    </Router>
  );
  const homeDiv = container.querySelector('.home-page');
  expect(homeDiv).toBeDefined();
});

module.exports = {};
