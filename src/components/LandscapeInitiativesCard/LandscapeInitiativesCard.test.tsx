import LandscapeInitiativesCard from './LandscapeInitiativesCard';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Landscape Initiatives Card is rendered correctly', () => {
  beforeEach(() => {
    render(<LandscapeInitiativesCard />);
  });

  test('Should display the Card Component', () => {
    expect(screen.getByTestId('card')).toBeDefined();
  });
});
