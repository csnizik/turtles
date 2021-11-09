import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});

describe('Verify ProductListGroup is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ProjectListGroup
        error={null}
        isError={false}
        isLoading={false}
        isSuccess={true}
        isMapDisplayed={false}
        projectsList={[]}
        selectedStateName={''}
      />
    );
  });

  test('Verify project component', () => {
    expect(screen.getByTestId('projects-list-group')).toBeDefined();
  });
});
