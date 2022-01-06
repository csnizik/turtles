import PracticeCard from './PracticeCard';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { Provider } from 'react-redux';

let store;

const setPracticeViewType = () => {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
    category: '2',
  }),
}));

afterEach(() => {
  cleanup();
});

describe('Practice Card is rendered correctly', () => {
  store = createTestStore();

  test('Should display the contents of the PracticeCard', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <PracticeCard setPracticeViewType={setPracticeViewType} />
      </Provider>
    );
    expect(screen.getByTestId('Practice-Card')).toBeDefined();

    await findByText('Conservation Crop Rotation');
    await findByText('Cover Crop');

    expect(screen.getAllByTestId('Practice-box')).toBeDefined();

    const button = screen.getByLabelText('Conservation Crop Rotation');
    fireEvent.click(button);

    expect(
      screen
        .getByRole('img', {
          name: /Conservation Crop Rotation/i,
        })
        .closest('img')
    ).toHaveAttribute(
      'src',
      '../../images/landscape-initiatives-images/Conservation-Crop-Rotation.png'
    );

    const secondButton = screen.getByLabelText('Cover Crop');
    fireEvent.click(secondButton);

    expect(
      screen
        .getByRole('img', {
          name: /Cover Crop/i,
        })
        .closest('img')
    ).toHaveAttribute(
      'src',
      '../../images/landscape-initiatives-images/Cover-Crop.png'
    );
  });
});
