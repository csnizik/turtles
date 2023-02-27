import ResourceConcernOverview from './ResourceConcernOverview';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
const data = 
  [{resourceConcernId: 161,
  resourceConcernName: 'Pesticides transported to groundwater',
  resourceConcernDescription: 'Description Incoming',
  highlighted: false,
  }];
let error;
const isLoading = false;
const isSuccess = true;
const isError = false;
describe('ResourceConcernOverview is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ResourceConcernOverview
        data={data}
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
        errors={isError}
      />
    );
  });

  test('Should display the contents of ResourceConcernOverview', () => {
    expect(screen.getByTestId('resource-conc-overview')).toBeDefined();
  });
});
