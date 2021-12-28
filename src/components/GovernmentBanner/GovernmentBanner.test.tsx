import { createMemoryHistory } from 'history';
import { useTranslation } from 'react-i18next';
import { Router } from 'react-router-dom';
import GovernmentBanner from './GovernmentBanner';

import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/00/ProjectsAndInitiatives/2/10',
  }),
}));

const spy = jest.fn();
window.addEventListener('navigateHome', spy);

const { t } = useTranslation();

describe('GovernmentBanner is rendered correctly', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <GovernmentBanner />
      </Router>
    );
  });
  test('Should display the contents of GovernmentBanner Header', () => {
    expect(screen.getByTestId('gov-banner-header')).toBeDefined();
  });

  test('Should display the contents of GovernmentBanner Navigation', () => {
    expect(screen.getByTestId('gov-banner-nav')).toBeDefined();
  });

  test('Should display NRCS text', () => {
    const nrcsText = t('header.nrcs');
    expect(screen.getByText(nrcsText)).toBeInTheDocument();
  });

  test('Should display USDA text', () => {
    const usdaText = t('header.usda');
    expect(screen.getByText(usdaText)).toBeInTheDocument();
  });

  test('Should display home text', () => {
    const homeText = t('header.home');
    expect(screen.getByText(homeText)).toBeInTheDocument();
  });

  test('Should dispatch when home link clicked', () => {
    expect(spy).not.toHaveBeenCalled();
    const homeText = t('header.home');
    fireEvent.click(screen.getByText(homeText));
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
});
