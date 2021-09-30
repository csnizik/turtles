import LandUseSection from './LandUseSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Land use section is rendered correctly', () => {
  beforeEach(() => {
    render(
      <LandUseSection setSearchInput={() => {}} setSearchInfo={() => {}} />
    );
  });

  test('Should display the group of checkboxes', () => {
    expect(
      screen.getByRole('group', { name: 'search-page.filter-by-land-use' })
    ).toBeDefined();
  });
});
