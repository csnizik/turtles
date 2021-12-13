import ProjectTypeSection from './ProjectTypeSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('Project Type Section is rendered correctly', () => {
  const selectedLandscapeInitiative = 2;
  const selectedProjectType = {
    id: 2,
    title: 'Landscape Conservation Initiatives',
    paragraphText: 'NRCS uses Landscape Conservation Initiatives',
    paragraphDescription: 'NRCS uses Landscape Conservation Initiatives',
    imgSrc: 'images/landscapeMap.png',
    imgAlt: 'Map of Landscape Conservation Initiatives in the United States',
  };
  const landscapeInitiativesData = {
    data: [
      {
        lci_id: 2,
        lci_name: 'Great Lakes Restoration Initiative',
        lci_resource: '',
        lci_image_link: 'https://www.nrcs.usda.gov/nrcseprd1843043.jpg',
        lci_page_link: 'https://www.nrcs.usda.gov/wps/portal',
        lci_page_link_text: 'Go to the Great Lakes Restoration',
        lci_description: ['The purpose of GLRI is to improve water quality'],
        lci_parent_id: null,
      },
    ],
  };

  beforeEach(() => {
    render(
      <ProjectTypeSection
        selectedLandscapeInitiative={selectedLandscapeInitiative}
        projectType={selectedProjectType}
        landscapeInitiativesData={landscapeInitiativesData}
      />
    );
  });

  test('Should display the LCI Overview', () => {
    expect(screen.getByTestId('project-type-overview')).toBeDefined();
    expect(screen.getByTestId('initiative-title')).toBeDefined();
    expect(
      screen.getByText('Great Lakes Restoration Initiative')
    ).toBeInTheDocument();
  });
  test('Should display the LCI Links and Image', () => {
    expect(
      screen.getByTitle('Go to the Great Lakes Restoration').closest('a')
    ).toHaveAttribute('href', 'https://www.nrcs.usda.gov/wps/portal');
    expect(
      screen.getByTitle('Go to the Great Lakes Restoration').closest('a')
    ).toHaveAttribute('target', '_blank');
    expect(
      screen
        .getByRole('img', {
          name: /Great Lakes Restoration Initiative/i,
        })
        .closest('img')
    ).toHaveAttribute('src', 'https://www.nrcs.usda.gov/nrcseprd1843043.jpg');
  });
  test('Should display the LCI Description', () => {
    expect(
      screen.getByText('The purpose of GLRI is to improve water quality')
    ).toBeInTheDocument();
  });
});

describe('Project Type Section is rendered correctly', () => {
  const selectedLandscapeInitiative = 0;
  const selectedProjectType = {
    id: 1,
    title: 'Conservation Innovation Grants',
    paragraphText: '(CIG) is a competitive program',
    paragraphDescription: 'Conservation Innovation Grants (CIG)',
    imgSrc: 'images/grantMap.png',
    imgAlt: 'Map of the United States',
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

  test('Should display the CIG Project Overview', () => {
    expect(screen.getByTestId('project-type-overview')).toBeDefined();
    expect(screen.getByTestId('project-type-title')).toBeDefined();
    expect(
      screen.getByText('Conservation Innovation Grants')
    ).toBeInTheDocument();
  });
  test('Should display the CIG Description', () => {
    expect(
      screen.getByText('Conservation Innovation Grants (CIG)')
    ).toBeInTheDocument();
  });
  test('Should display the CIG Links', () => {
    expect(
      screen
        .getByRole('link', {
          name: /Conservation Innovation Grants link opens a new tab/i,
        })
        .closest('a')
    ).toHaveAttribute('href', 'https://usda.gov');
    expect(
      screen
        .getByRole('link', {
          name: /Conservation Innovation Grants link opens a new tab/i,
        })
        .closest('a')
    ).toHaveAttribute('target', '_blank');
    expect(
      screen
        .getByRole('link', {
          name: /Conservation Innovation Grants link opens in a new tab/i,
        })
        .closest('a')
    ).toHaveAttribute('href', '/search');
    expect(
      screen
        .getByRole('link', {
          name: /Conservation Innovation Grants link opens in a new tab/i,
        })
        .closest('a')
    ).toHaveAttribute('target', '_blank');
  });
});
