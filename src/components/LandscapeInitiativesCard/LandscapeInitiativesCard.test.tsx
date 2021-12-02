import LandscapeInitiativesCard from './LandscapeInitiativesCard';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Landscape Initiatives Card is rendered correctly', () => {
  const lci_name = 'Golden-Winged Warbler';
  const lci_description =
    'The golden-winged warbler is a nationally identified target species of the Working Lands for Wildlife (WLFW) partnership, a collaborative approach to conserve habitat on working lands. ';

  beforeEach(() => {
    render(
      <LandscapeInitiativesCard
        title={lci_name}
        description={lci_description}
      />
    );
  });

  test('Should display the Card Component', () => {
    expect(screen.getByTestId('card')).toBeDefined();
  });
  // test('Should display the Card Title', () => {
  //   expect(screen.getByTestId('title')).toBeDefined();
  // });
  // test('Should display the Card Description', () => {
  //   expect(screen.getByTestId('description')).toBeDefined();
  // });
});
