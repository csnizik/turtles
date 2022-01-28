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
      screen.getByText('Resource Concerns Treated').closest('a')
    ).toHaveAttribute('href', '#ResourceConcernsTreated');
    expect(
      screen.getByText('Support for this Practice').closest('a')
    ).toHaveAttribute('href', '#SupportPractice');
    expect(
      screen.getByText('Practice Specifications and Tools').closest('a')
    ).toHaveAttribute('href', '#PracticeSpecifications');
    expect(
      screen.getByText('Practice Projects & Initiatives').closest('a')
    ).toHaveAttribute('href', '#ProjectsInitiatives');
  });
  test('Should display the right arrow', () => {
    const button = screen.getByLabelText('Right button');
    fireEvent.click(button);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
  test('Should display the left arrow', () => {
    const button = screen.getByLabelText('Left button');
    fireEvent.click(button);
    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
  });
});
