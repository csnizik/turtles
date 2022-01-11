import SearchByResourceConcern from './SearchByResourceConcern';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

let setSearchInput = jest.fn;
let setSearchInfo = jest.fn;
let setResourceConcernsSubgroups = null;
let selectedResourceCategory = null;
let setSelectedResourceCategory = null;
let selectedPractice = null;
let practiceId = null;
let selectedResourceConcern = {};
let setSelectedResourceConcern = null;
let store;

describe('SearchByResourceConcern is rendered correctly', () => {
  beforeEach(() => {
    render(<SearchByResourceConcern setSearchInput = {setSearchInput}
        setSearchInfo= {setSearchInfo}
        setResourceConcernsSubgroups = {setResourceConcernsSubgroups}
        selectedResourceCategory = {selectedResourceCategory}
        setSelectedResourceCategory = {setSelectedResourceCategory}
        selectedPractice = {selectedPractice}
        practiceId = {practiceId}
        selectedResourceConcern = {selectedResourceConcern}
        setSelectedResourceConcern = {setSelectedResourceConcern}/>);
  });

  test('Should display the contents of SearchByResourceConcern', () => {
    expect(screen.getByTestId('rc-search')).toBeDefined();
  });
});