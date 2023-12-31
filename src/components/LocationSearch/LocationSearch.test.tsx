import LocationSearch from './LocationSearch';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { Provider } from 'react-redux';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';

afterEach(() => {
  cleanup();
});

let store;

describe('Location Search is rendered correctly', () => {
  store = createTestStore();

  store.dispatch(setStaticText(staticText));

  test('Should test dropdown and state selection functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>
    );

    expect(
      screen.queryByText(staticText.data.homeLocationTitle.configurationValue)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        staticText.data.homeLocationDescription.configurationValue
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('location-search.labels.select-state')
    ).toBeInTheDocument();

    expect(
      screen.getByText('aria-label')
    ).toBeInTheDocument();
    
    expect(
      screen.getByText('state-displayname')
    ).toBeInTheDocument();
  
    fireEvent.click(screen.getByText('location-search.national'));

    await findByText('Colorado');

    fireEvent.click(screen.getByText('Colorado'));

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: '08' },
    });

    expect(screen.getByTestId('select')).toHaveValue('08');

    fireEvent.click(screen.getByRole('button'));

    expect(
      screen
        .getByRole('img', {
          name: /Map of the United States/i,
        })
        .closest('img')
    ).toHaveAttribute('src', 'images/homePageUSMap.png');
  });
});
