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
