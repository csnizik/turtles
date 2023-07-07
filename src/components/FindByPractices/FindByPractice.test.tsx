import { Provider } from 'react-redux';
import FindByPractices from './FindByPractices';
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
        <FindByPractices />
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
      screen.getByText('search-by-conservation-practice.first-label-name')
    ).toBeInTheDocument();

    expect(
      screen.getByText('search-by-conservation-practice.second-label-name')
    ).toBeInTheDocument();

    expect(
      screen.getByText('aria-label')
    ).toBeInTheDocument();

    expect(
      screen.getByText('practice-category-displayname')
    ).toBeInTheDocument();

    await findByText('Cropland Soil Quality');
    fireEvent.click(screen.getByText('Cropland Soil Quality'));
    expect(screen.getByText('Cropland Soil Quality'));
    fireEvent.change(screen.getByTestId('categoryOptions'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('categoryOptions')).toHaveValue('2');

    await findByText('Cover Crop');
    fireEvent.click(screen.getByText('Cover Crop'));
    expect(screen.getByText('Cover Crop'));
    fireEvent.change(screen.getByTestId('practiceOptions'), {
      target: { value: '20' },
    });
    expect(screen.getByTestId('practiceOptions')).toHaveValue('20');

    expect(
      screen
        .getByRole('img', {
          name: /Soil/i,
        })
        .closest('img')
    ).toHaveAttribute(
      'src',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B-LQ-QdFXKeJgU9W0wxxffcnPg3FS8ox4Q&usqp=CAU'
    );

    expect(
      screen.getByText('find-by-practice.find-practices')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
  });
});
