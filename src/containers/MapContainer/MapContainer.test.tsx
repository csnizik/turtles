import MapContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Map container is rendered correctly', () => {
  beforeEach(() => {
    render(<MapContainer setSelectedLocation={jest.fn()} />);
  });

  test('Verify landscape map is loaded', async () => {
    const cigMap = await screen.getByTestId('cig-map');
    expect(cigMap).toBeInTheDocument();
  });
});
