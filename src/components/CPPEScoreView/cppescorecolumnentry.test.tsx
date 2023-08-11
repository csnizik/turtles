import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { CPPEScoreEntry } from './CPPEScoreColumnEntry';

afterEach(() => {
  cleanup();
});
// let activeCheckClass = [1];
const checked = false;
const activeClassName = 0;
let hidKey = 0;
const dummyItem = {
  id: 0,
  Id2: 0,
  title: 'Dummy Title',
  shortDescription: 'Dummy Description',
};
const MockHandleRowClick = jest.fn();
const MockHandleChange = jest.fn();
describe('Verify CPPEScore is rendered correctly', () => {
  beforeEach(() => {
    render(
      <CPPEScoreEntry
        key={hidKey}
        handleChange={MockHandleChange}
        handleRowClick={MockHandleRowClick}
        item={dummyItem}
        hiddenKey={hidKey++}
        checked={checked}
        activeClassName={activeClassName}
      />
    );
  });

  test('Verify CPPEScoreEntry component', async () => {
    expect(screen.getByText('Dummy Description')).toBeInTheDocument();
    expect(screen.getByText('Dummy Title')).toBeInTheDocument();
    expect(screen.getByTestId('RowClick')).toBeInTheDocument();
  });
  
});
