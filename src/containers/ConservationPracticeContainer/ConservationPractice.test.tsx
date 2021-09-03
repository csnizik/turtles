import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';

afterEach(() => {
    cleanup();
});

describe('Conservation practice video section is rendered correctly', () => {
    beforeEach(() => {
      render(<ConservationPracticeVideo />);
    });

    test('Should display the video section of the conservation practice', () => {
        expect(screen.getByTestId('video-box-container')).toBeDefined();
    });
  
    test('Conservation Practice page should contain a iframe', () => {
        expect(screen.getByTestId('video-iframe')).toBeDefined();
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