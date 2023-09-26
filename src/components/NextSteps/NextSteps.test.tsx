import NextSteps from './NextSteps';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';
import { Provider } from 'react-redux';

let store;

const setNextStepsType = () => {};

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

describe('Next Steps is rendered correctly', () => {
  store = createTestStore();

  test('Should display the contents of the NextSteps', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <NextSteps />
      </Provider>
    );
    expect(screen.getByTestId('Next-Steps')).toBeDefined();

    await findByText('Next Steps');
    await findByText('Find Your Local Service Center');
    await findByText('Farm Service Agency (FSA)');

    const button = screen.getByLabelText('Find your local Service Center');
    fireEvent.click(button);

    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('Register for a farm number to participate in USDA programs')
          );
        }
      })
    );

    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('USDA Service Centers are offices')
          );
        }
      })
    );
  });
});
