import {
  cleanup,
  render,
  screen,
} from '../../common/test-utils/test_utils';
import { ICPPEPractice } from '../../common/types';
import CPPECautionEntry from './CPPECautionEntry';

afterEach(() => {
  cleanup();
});

const mockPracticeResponse: ICPPEPractice = {
// Create mock practice object that matches the expected type
resourceConcernId: 160,
practiceCode: '326',
resourceConcernName: 'Sediment transported to surface water',
resourceConcernDescription: 'Offsite transport of sediment to surface water degrades water quality and limits use for intended purpsoes',
practiceName: 'Clearing and Snagging',
cppeEffectValue: -2,
rationale: 'Removal of snags or large wood may re-suspend sediments into the stream.'
}

describe('Verify CPPECautionEntry is rendered correctly', () => {
beforeEach(() => {
    render(
      <CPPECautionEntry practice={mockPracticeResponse}/>
    )
  });

  test('Verify CPPECaution component', async () => {
    expect(screen.getByText('Caution for application')).toBeInTheDocument();
  });

});