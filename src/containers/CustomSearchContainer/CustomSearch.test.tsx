import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import { createTestStore } from '../../Redux/store';
import { api } from '../../Redux/services/api';

import CustomSearch from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

afterEach(() => {
  cleanup();
});

describe('Custom search container is rendered correctly', () => {
  const store = createTestStore();
  store.dispatch(setStaticText(staticText));

  beforeEach(() => {
    render(
      <Provider store={store}>
        <CustomSearch />
      </Provider>
    );
  });

  test('Should display the contents of the custom search container', () => {
    expect(screen.queryByTestId('custom-search-container')).toBeDefined();
  });

  test('Should display the Search Page Title', () => {
    expect(
      screen.queryByText(staticText.data.quickSearchTitle.configurationValue)
    ).toBeDefined();
  });

  test('Should display the Search Page Intro', () => {
    expect(
      screen.queryByText(
        staticText.data.quickSearchDescription.configurationValue
      )
    ).toBeDefined();
  });

  test('Should display the Search Page Filter Info', () => {
    expect(screen.queryByText('search-page.about-filter')).toBeDefined();
  });

  test('Should display the Search by Description', () => {
    expect(
      screen.queryByText('search-by-conservation-practice.description')
    ).toBeDefined();
  });

  test('Should display Practices Dropdown Clear Button', () => {
    expect(screen.queryAllByText('actions.clear')).toBeDefined();
  });

  test('Should Clear the Practices Dropdowns', () => {
    const btn = screen.getByRole('button', {
      name: 'Clear Practices and Resource Concerns',
    });

    userEvent.click(btn);
    expect(
      screen.getByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === 'All practices (default)'
      )
    );
    expect(
      screen.queryByRole(
        (role, element) =>
          role === 'option' && element?.textContent === '- Select practice -'
      )
    );
    expect(
      screen.queryByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === 'All resource concerns (default)'
      )
    );
    expect(
      screen.queryByRole(
        (role, element) =>
          role === 'option' &&
          element?.textContent === '- Select resource concern -'
      )
    );
  });

  test('Custom search page should contain a search button', () => {
    expect(screen.queryByRole('button', { name: /search/i }));
  });

  test('Custom search page should contain an Apply Filters button', () => {
    expect(screen.queryByRole('button', { name: /apply filters/i }));
  });
});
