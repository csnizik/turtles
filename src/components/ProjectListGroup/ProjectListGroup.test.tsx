import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});

describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    render(<ProjectListGroup practiceId={1} stateCode='00' />);
  });

  test('Verify project component', () => {
    expect(screen.getByTestId('projects-list-group')).toBeDefined();
  });
});
