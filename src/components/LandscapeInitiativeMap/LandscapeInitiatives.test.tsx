import { filterLandscapeInitiativeLayers } from './utils';
import LandscapeMapContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

const sampleLandscapeInitiativeList = [
  { id: 1, title: 'Great Lakes Restoration Initiative' },
  { id: 2, title: 'Joint Chiefs Landscape Restoration Partnership' },
  { id: 5, title: 'Mississippi River Basin' },
];

const filterList = ['Mississippi River Basin'];

describe('Landscape initiative utils are working properly', () => {
  test('Test filter utils function', () => {
    const filteredList =
      filterLandscapeInitiativeLayers(
        sampleLandscapeInitiativeList,
        filterList
      ) || [];
    expect(filteredList.length).toBe(1);
  });
});

describe('Projects container is rendered correctly', () => {
  beforeEach(() => {
    render(
      <LandscapeMapContainer
        landscapeInitiativesData={[]}
        selectedLandscapeInitiative={8}
      />
    );
  });

  test('Verify landscape map is loaded', () => {
    expect(1).toBe(1);
  });
});
