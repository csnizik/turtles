import HorizontalScroll from './HorizontalScroll';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Horizontal Scroll Bar is rendered correctly', () => {
  beforeEach(() => {
    render(<HorizontalScroll />);
  });

  test('Should display the contents of the Horizontal Scroll Bar', () => {
    expect(
      screen.getByLabelText('Resource Concerns Treated').closest('a')
    ).toHaveAttribute('href', '#ResourceConcernsTreated');
    expect(
      screen.getByLabelText('Support for this Practice').closest('a')
    ).toHaveAttribute('href', '#SupportPractice');
    expect(
      screen.getByLabelText('Practice Specifications and Tools').closest('a')
    ).toHaveAttribute('href', '#PracticeSpecifications');
    expect(
      screen.getByLabelText('Practice Projects & Initiatives').closest('a')
    ).toHaveAttribute('href', '#ProjectsInitiatives');
  });
  test('Should display the right arrow', () => {
    const button = screen.getByLabelText('right-button');
    fireEvent.click(button);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
  test('Should display the left arrow', () => {
    const button = screen.getByLabelText('left-button');
    fireEvent.click(button);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
});
