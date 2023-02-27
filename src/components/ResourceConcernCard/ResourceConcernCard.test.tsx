import { Provider } from 'react-redux';
import ResourceConcernCardDetails from './ResourceConcernCard';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { createTestStore } from '../../Redux/store';

let store;

const setPracticeViewType = () => {
  return 1;
};

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
        <ResourceConcernCardDetails
          setResourceConcernViewType={setPracticeViewType}
        />
      </Provider>
    );
    expect(screen.getByTestId('ResourceConcern-Card')).toBeDefined();

    await findByText('Emissions of airborne reactive nitrogen');
    await findByText('Emissions of greenhouse gases - GHGs');
    await findByText('5 ResourceConcerns');

    expect(screen.getAllByTestId('ResourceConcern-box')).toBeDefined();

    const button = screen.getByLabelText('Emissions of ozone precursors');
    fireEvent.click(button);

    expect(
      screen
        .getByAltText('Emissions of particulate matter (PM) and PM precursors')
        .closest('img')
    ).toHaveAttribute(
      'src',
      '../../images/landscape-initiatives-images/default.jpg'
    );

    // expect(
    //   screen.getByText((content: any, element: any) => {
    //     if (element) {
    //       return (
    //         element.tagName.toLowerCase() === 'p' &&
    //         content.startsWith('Crops included in conservation crop rotation')
    //       );
    //     }
    //   })
    // );

    const secondButton = screen.getByLabelText('Objectionable odor');
    fireEvent.click(secondButton);

    expect(
      screen
        .getByAltText('Emissions of airborne reactive nitrogen')
        .closest('img')
    ).toHaveAttribute(
      'src',
      '../../images/landscape-initiatives-images/default.jpg'
    );

    // expect(
    //   screen.getByText((content: any, element: any) => {
    //     if (element) {
    //       return (
    //         element.tagName.toLowerCase() === 'p' &&
    //         content.startsWith('Cover and green manure crops are grown')
    //       );
    //     }
    //   })
    // );
  });
});
