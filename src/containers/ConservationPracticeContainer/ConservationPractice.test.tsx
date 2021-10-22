import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import ConservationPracticeVideo from '../../components/ConservationPracticeVideo';
import ResourceConcernTreated from '../../components/ResourceConcernTreated';
import ConservationPracticeOverview from '../../components/ConservationPracticeOverview';

afterEach(() => {
  cleanup();
});

//Note*: Will remove the comment after api endpoint is functional, waiting for new branch that has new endpoint to be merged
describe('Conservation practice video section is rendered correctly', () => {
  beforeEach(() => {
    render(<ConservationPracticeVideo selectedPracticeId={9} />);
  });

  test('Should display the video section of the conservation practice', () => {
    expect(screen.queryByTestId('video-box-container')).toBeDefined();
  });

  test('Conservation Practice page should contain a video media section', () => {
    expect(screen.queryByTestId('video-media')).toBeDefined();
  });
});

describe('Resource Concerns Treated section is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ResourceConcernTreated selectedStateCode='01' selectedPracticeId={1} />
    );
  });

  test('Should display a static description', () => {
    expect(screen.queryByTestId('rc-description')).toBeDefined();
  });

  test('Should display an accordion for users to click', () => {
    expect(screen.queryByTestId('rc-accordion')).toBeDefined();
  });

  // not sure what the idea for the test is here. toHaveClass must bee  provided at least one class  https://github.com/testing-library/jest-dom#tohaveclass

  // test('Should display an accordion that face to the right', () => {
  //   let { container } = render(
  //     <ResourceConcernTreated selectedStateCode='01' selectedPracticeId={1} />
  //   );
  //   expect(container.firstChild).toHaveClass();
  // });
});
