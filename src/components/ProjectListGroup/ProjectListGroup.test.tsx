import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});

describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    render(<ProjectListGroup />);
  });

  test('Verify project component', () => {
    expect(screen.getByTestId('projects-list-group')).toBeInTheDocument();
  });
});
