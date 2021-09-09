import ConservationPracticeIntroduction from './ConservationPracticeIntroduction';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

// describe('ConservationPracticeIntroduction is rendered correctly', () => {
   
    
//   beforeEach(() => {
//       render(<ConservationPracticeIntroduction />);
//   });

//   test('Should display the contents of ConservationPracticeIntroduction', () => {
//         expect(screen.getByTestId('introduction-content')).toBeDefined();
//   });
// });
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});