import ProjectListGroup from '../ProjectListGroup';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Exception Message is rendered correctly', () => {

  beforeEach(() => {
    
    render(
      <ProjectListGroup
        isMapDisplayed={false}
        selectedStateName='Connecticut'
      />
    );
  });

  test('Should display the Exception Message Component', () => {
    expect(screen.getByTestId('exception-content-container')).toBeDefined();
  });
  test('Should display the Exception Message title', () => {
    expect(screen.getByTestId('exception-content-title')).toBeDefined();
  });
  test('Should display the Exception Message description', () => {
    expect(screen.getByTestId('exception-content-description')).toBeDefined();
  });
  test('Should display Connecticut as the state name', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('Connecticut')
          );
        }
      })
    );
  });
  test('Should display a long paragraph reminding users there are some other projects across the U.S.', () => {
    expect(
      screen.getByText((content: any, element: any) => {
        if (element) {
          return (
            element.tagName.toLowerCase() === 'p' &&
            content.startsWith('The projects below represent projects across the United States.')
          );
        }
      })
    );
  });
  
});
