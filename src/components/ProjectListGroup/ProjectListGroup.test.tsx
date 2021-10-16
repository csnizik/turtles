import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});

describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    render(<ProjectListGroup />);
  });

  test('Verify project tabs are rendered', () => {
    expect(
      screen.getByTestId('project-and-initiative-tabs')
    ).toBeInTheDocument();
  });
});
