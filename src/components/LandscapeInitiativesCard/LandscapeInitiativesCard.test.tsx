import LandscapeInitiativesCard from './LandscapeInitiativesCard';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Landscape Initiatives Card is rendered correctly', () => {
  const lci_name = 'Golden-Winged Warbler';
  const lci_description = ['Identified target species'];

  beforeEach(() => {
    render(
      <LandscapeInitiativesCard
        title={lci_name}
        description={lci_description}
      />
    );
  });

  test('Should display the Card Component', () => {
    expect(screen.getByTestId('subInitiativesCard')).toBeDefined();
  });
  test('Should display the Card Title', () => {
    expect(screen.getByTestId('subInitiativesTitle')).toBeDefined();
    expect(screen.getByText('Golden-Winged Warbler')).toBeInTheDocument();
  });
  test('Should display the Card Description', () => {
    expect(screen.getByTestId('subInitiativesDescription')).toBeDefined();
    expect(screen.getByText('Identified target species')).toBeInTheDocument();
  });
});
