import LocationSearch from './LocationSearch';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('LocationSearch is rendered correctly', () => {
  beforeEach(() => {
    render(<LocationSearch/>);
  });

  test('Should display the contents of LocationSearch', () => {
    expect(screen.getByTestId('location-search')).toBeDefined();
  });

});