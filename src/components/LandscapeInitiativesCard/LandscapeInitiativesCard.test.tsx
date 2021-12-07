import LandscapeInitiativesCard from './LandscapeInitiativesCard';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Landscape Initiatives Card is rendered correctly', () => {
  const lci_name = 'Golden-Winged Warbler';
  const lci_description = ['Identified target species'];
  const lci_link = 'https://www.nrcs.usda.gov/';
  const sub_name = 'Gopher Tortoise';

  beforeEach(() => {
    render(
      <LandscapeInitiativesCard
        title={lci_name}
        description={lci_description}
        link={lci_link}
      />
    );
  });

  test('Should display the Landscape Initiatives Card Component', () => {
    expect(screen.getByTestId('subInitiativesCard')).toBeDefined();
  });
  test('Should display the Landscape Initiatives Card Title', () => {
    expect(screen.getByTestId('subInitiativesTitle')).toBeDefined();
    expect(screen.getByText('Golden-Winged Warbler')).toBeInTheDocument();
  });
  test('Should display the Landscape Initiatives Card Description', () => {
    expect(screen.getByTestId('subInitiativesDescription')).toBeDefined();
    expect(screen.getByText('Identified target species')).toBeInTheDocument();
  });
  test('Should test Landscape Initiatives Card Link', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    fireEvent.mouseOver(link);
    expect(
      screen.getByText('Golden-Winged Warbler').closest('a')
    ).toHaveAttribute('href', 'https://www.nrcs.usda.gov/');
  });
});
