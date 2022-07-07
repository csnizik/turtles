import ConservationPracticeIntroduction from './ConservationPracticeIntroduction';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ConservationPracticeIntroduction is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ConservationPracticeIntroduction
        introductionParagraph='This is the intro paragraph'
        title='Conservation Practice'
      />
    );
  });

  test('Should display the contents of ConservationPracticeIntroduction', () => {
    expect(screen.getByTestId('introduction-content')).toBeDefined();
  });
  test('Should display the ConservationPractice title', () => {
    expect(screen.getByText('Conservation Practice')).toBeDefined();
  });
  test('Should display the ConservationPractice introduction Paragraph', () => {
    expect(screen.getByText('This is the intro paragraph')).toBeDefined();
  });
});
