import ProjectsContainer from '.';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Projects container is rendered correctly', () => {
  beforeEach(() => {
    render(<ProjectsContainer />);
  });

  test('Should display the contents of the projects container', () => {
    expect(screen.getByTestId('projects-container')).toBeDefined();
  });

  test('Projects container should contain two map components', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'h2' &&
            content.startsWith('Conservation')
          );
        }
      })
    );
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'h2' &&
            content.startsWith('Landscape')
          );
        }
      })
    );
  });
});
