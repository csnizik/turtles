import { filterLandscapeInitiativeLayers } from './utils';

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
