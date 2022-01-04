import LocationSearch from './LocationSearch';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Location Search is rendered correctly', () => {
  beforeEach(() => {
    render(<LocationSearch />);
  });

  test('Should select a location from the dropdown', () => {
    expect(
      screen.getByText('location-search.labels.select-state')
    ).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue(/location-search.national/i), {
      target: { value: '08' },
    });
    // fireEvent.click(screen.getByText('location-search.national'));
    // fireEvent.click(screen.getByText('Colorado'));
    // expect(screen.getByTestId('select-option')).toHaveValue('08');
  });
  test('Should test the Explore Location button', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(
      screen.getByText('location-search.explore-location')
    ).toBeInTheDocument();
  });
});
