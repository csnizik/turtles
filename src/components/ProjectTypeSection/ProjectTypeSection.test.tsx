import ProjectTypeSection from './ProjectTypeSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Project Type Section is rendered correctly', () => {
  const selectedLandscapeInitiative = 2;
  const selectedProjectType = {
    id: 1,
    title: 'Landscape Conservation Initiatives',
    paragraphText:
      'NRCS uses Landscape Conservation Initiatives to accelerate the benefits of voluntary conservation programs, such as cleaner water and air, healthier soil and enhanced wildlife habitat.',
    paragraphDescription:
      'NRCS uses Landscape Conservation Initiatives to accelerate the benefits of voluntary conservation programs, such as cleaner water and air, healthier soil and enhanced wildlife habitat.',
    imgSrc: 'images/landscapeMap.png',
    imgAlt: 'Map of Landscape Conservation Initiatives in the United States',
  };
  const landscapeInitiativesData = 'Landscape Initiatives Information';

  beforeEach(() => {
    render(
      <ProjectTypeSection
        selectedLandscapeInitiative={selectedLandscapeInitiative}
        projectType={selectedProjectType}
        landscapeInitiativesData={landscapeInitiativesData}
      />
    );
  });

  test('Should display the Project Overview', () => {
    expect(screen.getByTestId('project-type-overview')).toBeDefined();
  });
  test('Should display the Project', () => {
    expect(screen.getByTestId('project-type-details')).toBeDefined();
    screen.debug();
  });
});
