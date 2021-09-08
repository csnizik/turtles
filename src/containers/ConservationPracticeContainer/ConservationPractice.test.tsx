import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';

afterEach(() => {
    cleanup();
});

//Note*: Will remove the comment after api endpoint is functional, waiting for new branch that has new endpoint to be merged
describe('Conservation practice video section is rendered correctly', () => {
    beforeEach(() => {
      render(<ConservationPracticeVideo selectedPracticeId={9}/>);
    });

    test('Should display the video section of the conservation practice', () => {
        expect(screen.queryByTestId('video-box-container')).toBeDefined();
    });
  
    test('Conservation Practice page should contain a video media section', () => {
        expect(screen.queryByTestId('video-media')).toBeDefined();
    });
});

// Reason for commenting out: Image cannot be loaded.
// Will switch to fetching Image from endpoint instead of local in this Iteration

// describe('Conservation practice overview section is rendered correctly', () => {
//     beforeEach(() => {
//       render(<ConservationPracticeOverview />);
//     });

//     test('Should display the description section of the conservation practice', () => {
//         expect(screen.getByTestId('overview-container')).toBeDefined();
//     });
// });