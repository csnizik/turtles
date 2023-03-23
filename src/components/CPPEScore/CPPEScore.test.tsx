import {
  cleanup,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import CPPEScore from './CPPEScore';

afterEach(() => {
  cleanup();
});
let stateCode = '00';
let resourceId = 145;

describe('Verify CPPEScore is rendered correctly', () => {
  beforeEach(() => {
    render(
      <CPPEScore
        selectedStateCode={stateCode}
        selectedResourceConcernId={resourceId}
      />
    );
  });

  test('Verify CPPEScore component', async () => {
    expect(screen.getByText('Conservation Practices Ranked by Physical Effects')).toBeInTheDocument();
  });
});
