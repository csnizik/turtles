import MapContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { DEFAULT_NATIONAL_LOCATION } from '../../common/constants';

afterEach(() => {
  cleanup();
});

describe('Map container is rendered correctly', () => {
  beforeEach(() => {
    render(
      <MapContainer
        setSelectedLocation={jest.fn()}
        stateCode={DEFAULT_NATIONAL_LOCATION}
      />
    );
  });

  test('Verify landscape map is loaded', async () => {
    const cigMap = await screen.getByTestId('cig-map');
    expect(cigMap).toBeInTheDocument();
  });
});
