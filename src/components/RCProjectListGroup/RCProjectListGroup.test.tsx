import { Provider } from 'react-redux';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { setSearch } from '../../Redux/Slice/resourceConcernSlice';
import { currentState } from '../../Redux/Slice/stateSlice';
import { createTestStore } from '../../Redux/store';
import RCProjectListGroup from './RCProjectListGroup';

afterEach(() => {
  cleanup();
});
let store;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    stateCode: '08',
  }),
}));

describe('Verify RCProjectListGroup is rendered correctly', () => {
  beforeEach(() => {
    const searchInput = {
      state_county_code: '08',
    };
    const stateInput = {
      stateNameDisplay: 'Colorado',
      stateCode: '08',
      stateAbbreviation: 'CO',
    };
    store = createTestStore();
    store.dispatch(setSearch(searchInput));
    store.dispatch(currentState(stateInput));
  });

  test('Verify project component is being rendered', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <RCProjectListGroup isMapDisplayed={false} selectedStateName='' />
      </Provider>
    );

    await findByText('Showing 1 - 10 of 11 projects/initiatives');
    await findByText('Conservation Innovation Grants (11)');
    await findByText('Landscape Conservation Initiatives (4)');
    await findByText(
      'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs'
    );
    fireEvent.click(await findByText('2'));
    await findByText(
      'The Perennial Fund: Combining Innovative Finance with Carbon Farm Planning and Training to Scale Conservation with Organic Crop and Carbon Markets'
    );
    fireEvent.click(await findByText('Landscape Conservation Initiatives (4)'));
    await findByText('Joint Chiefs Landscape Restoration Partnership');
  });

  test('Verify project component is being rendered under Map Component', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <RCProjectListGroup isMapDisplayed={true} selectedStateName='' />
      </Provider>
    );

    await findByText('1 - 10 of 11 projects for Colorado');
    await findByText(
      'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs'
    );
    fireEvent.click(await findByText('2'));
    await findByText(
      'The Perennial Fund: Combining Innovative Finance with Carbon Farm Planning and Training to Scale Conservation with Organic Crop and Carbon Markets'
    );
  });
});
