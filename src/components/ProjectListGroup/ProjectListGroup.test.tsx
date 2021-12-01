import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { setSearch } from '../../Redux/Slice/practiceSlice';
import ProjectListGroup from './ProjectListGroup';

afterEach(() => {
  cleanup();
});

describe('Verify ProductListGroup is rendered correctly', () => {
  const testData = {
    state_county_code: '08',
  };
  beforeEach(() => {
    render(
      <ProjectListGroup
        isMapDisplayed={false}
        selectedStateName=''
        testData={testData}
      />
    );
  });

  test('Verify project component', () => {
    expect(screen.getByTestId('projects-list-group')).toBeDefined();
  });
});
