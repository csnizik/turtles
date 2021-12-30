import { Provider } from 'react-redux';
import CustomTabs from './CustomTabs';
import { currentState } from '../../Redux/Slice/stateSlice';
import { createTestStore } from '../../Redux/store';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '../../common/test-utils/test_utils';
//import { Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});
let currOption = 0;
let searchOptionList = {
  Overview: {
    id: 0,
    displayName: 'Overview',
  },
  ConservationPractices: {
    id: 1,
    displayName: 'Conservation Practices',
  },
  ProjectsAndInitiatives: {
    id: 2,
    displayName: 'Projects And Initiatives',
  },
};
let handleChangeSearchOption = () => {};
let tabStyleOption = 0;

let store;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '06',
  }),
}));
describe('CustomTabs is rendered correctly', () => {
  beforeEach(() => {
    const state = {
      stateNameDisplay: 'California',
      stateCode: '06',
      stateAbbreviation: 'CA',
    };
    store = createTestStore();
    store.dispatch(currentState(state));
    render(
      <Provider store={store}>
        <CustomTabs
          currOption={currOption}
          searchOptionList={searchOptionList}
          handleChangeSearchOption={handleChangeSearchOption}
          tabStyleOption={tabStyleOption}
          // hideOverviewTab={false}
        />
      </Provider>
    );
  });

  test('Should display the contents of CustomTabs', () => {
    expect(screen.getByTestId('custom-tabs')).toBeDefined();
  });
  test('Should display the contents of the Conservation Practices tab', () => {
    expect(screen.getByText('CA Conservation Practices')).toBeInTheDocument();
  });
  test('Should display the contents of the Projects And Initiatives', () => {
    expect(screen.getByText('CA Projects And Initiatives')).toBeInTheDocument();
  });
});
