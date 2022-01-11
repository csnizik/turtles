import ConservationPracticeVideo from './ConservationPracticeVideo';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
let data = [
  {
    videoId: 12,
    videoName: 'Cover Crop',
    videoDescription: 'A Cover Crop is',
    videoLink: 'https://www.youtube.com/embed/NLoEkcbsJLo',
  },
];
let error;
let isLoading = false;
let isSuccess = true;
let isError = false;
describe('ConservationPracticeVideo is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ConservationPracticeVideo
        data={data}
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
        errors={isError}
      />
    );
  });

  test('Should display the contents of ConservationPracticeVideo', () => {
    expect(screen.getByTestId('video-box-container')).toBeDefined();
  });
});
