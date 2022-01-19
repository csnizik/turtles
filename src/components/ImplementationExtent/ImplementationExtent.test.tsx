import ImplementationExtent from './ImplementationExtent';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
//Does not run due to Tableau import errors
afterEach(() => {
  cleanup();
});

const data = {};
const isSuccess = true;

describe('ImplementationExtent is rendered correctly', () => {
  beforeEach(() => {
    render(<ImplementationExtent data={data} isSuccess={isSuccess} />);
  });

  test('Should display the contents of ImplementationExtent', () => {
    expect(screen.getByTestId('i-extent')).toBeDefined();
  });
});
