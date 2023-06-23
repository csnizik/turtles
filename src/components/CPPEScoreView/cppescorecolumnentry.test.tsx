import {
  cleanup,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import {CPPESCoreEntry} from './CPPEScoreColumnEntry';

afterEach(() => {
  cleanup();
});
let activeCheckClass = [1];
let activeClassName = 0;
let hidKey = 0;
let dummyItem = {
  id: 0,
  Id2: 0,
  title: 'Dummy Title',
  shortDescription: 'Dummy Description',
}
const dummyHandleCheckClick = jest.fn();
const dummyHandleRowClick = jest.fn();
describe('Verify CPPEScore is rendered correctly', () => {
  beforeEach(() => {
    render(
      <CPPESCoreEntry
      key={hidKey} handleCheckClick={dummyHandleCheckClick} handleRowClick={dummyHandleRowClick} item={dummyItem}
      hiddenKey={hidKey++} activeCheckClass={activeCheckClass} activeClassName={activeClassName}
      />
    );
  });

  test('Verify CPPEScoreEntry component', async () => {
    expect(screen.getByText('Dummy Description')).toBeInTheDocument();
    expect(screen.getByText('Dummy Title')).toBeInTheDocument();
  });
});