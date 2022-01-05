import PracticeRow from './PracticeRow';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

let handleRowSelect = null;
let rowData = {};

describe('PracticeRow is rendered correctly', () => {
  beforeEach(() => {
    render(<PracticeRow handleRowSelect={handleRowSelect} rowData={rowData} />);
  });

  test('Should display the contents of PracticeRow', () => {
    expect(screen.getByTestId('practice-row')).toBeDefined();
  });
});