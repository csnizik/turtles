import SearchByLocation from './SearchByLocation';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

let setSearchInput = jest.fn;
let setSearchInfo = jest.fn;

describe('SearchByLocation is rendered correctly', () => {
  beforeEach(() => {
    render(<SearchByLocation setSearchInput = {setSearchInput}
        setSearchInfo= {setSearchInfo}/>);
  });

  test('Should display the contents of SearchByLocation', () => {
    expect(screen.getByTestId('location-search')).toBeDefined();
  });
});