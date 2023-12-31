import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import { mswServer } from './api-mocks/msw-server';
import 'whatwg-fetch';

beforeAll(() => mswServer.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
const noop = () => {}
Object.defineProperty(window, "scroll", { value: noop, writable: true })
jest.mock('../jest.config.js');
// Mock external components and functions
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({
    path: '',
    url: '',
  }),
  Switch: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
  Route: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('@arcgis/core/views/MapView');
jest.mock('@arcgis/core/widgets/Home');
