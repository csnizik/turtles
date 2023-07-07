import { Provider } from 'react-redux';
import FindByResources from './FindByResources';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';

import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';

afterEach(() => {
  cleanup();
});

let store;

describe('Find by Practice Search component is rendered correctly', () => {
  store = createTestStore();

  store.dispatch(setStaticText(staticText));

  test('Should test dropdown and practice selection functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <FindByResources />
      </Provider>
    );

    expect(
      screen.queryByText(staticText.data.homePracticeTitle.configurationValue)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        staticText.data.homePracticeDescription.configurationValue
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('search-by-resource-concern-home.first-label-name')
    ).toBeInTheDocument();

    expect(
      screen.getByText('search-by-resource-concern-home.second-label-name')
    ).toBeInTheDocument();

    expect(
      screen.getByText('aria-label')
    ).toBeInTheDocument();

    expect(
      screen.getByText('concern-displayname')
    ).toBeInTheDocument();

    await findByText('Air');
    fireEvent.click(screen.getByText('Air'));
    expect(screen.getByText('Air'));
    fireEvent.change(screen.getByTestId('categoryOptions'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('categoryOptions')).toHaveValue('2');

    await findByText('Objectionable odor');
    fireEvent.click(screen.getByText('Objectionable odor'));
    expect(screen.getByText('Objectionable odor'));
    fireEvent.change(screen.getByTestId('resourceOptions'), {
      target: { value: '180' },
    });
    expect(screen.getByTestId('resourceOptions')).toHaveValue('180');

    expect(
      screen
        .getByRole('img', {
          name: /Man and Woman looking at construction field/i,
        })
        .closest('img')
    ).toHaveAttribute(
      'src',
      'images/resource-search-image.png'
    );

    expect(
      screen.getByText('find-by-resource.find-resources')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
  });
});
