import { Provider } from 'react-redux';
import ProjectTypeSection from './ProjectTypeSection';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { staticText } from '../../api-mocks/constants';

import { createTestStore } from '../../Redux/store';

afterEach(() => {
  cleanup();
});

let store;

describe('Project Type Section is rendered correctly', () => {
  const selectedLandscapeInitiative = 2;
  const selectedProjectType = {
    id: 2,
  };
  const landscapeInitiativesData = {
    data: [
      {
        lciId: 2,
        lciName: 'Great Lakes Restoration Initiative',
        lciResource: '',
        lciImageLink: 'https://www.nrcs.usda.gov/nrcseprd1843043.jpg',
        lciPageLink: 'https://www.nrcs.usda.gov/wps/portal',
        lciPageLinkText: 'Go to the Great Lakes Restoration',
        lciDescription: ['The purpose of GLRI is to improve water quality'],
        lciParentId: null,
      },
    ],
  };

  beforeEach(() => {
    store = createTestStore();
    store.dispatch(setStaticText(staticText));
    render(
      <Provider store={store}>
        <ProjectTypeSection
          selectedLandscapeInitiative={selectedLandscapeInitiative}
          projectType={selectedProjectType}
          landscapeInitiativesData={landscapeInitiativesData}
        />
      </Provider>
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
    ).toHaveAttribute('href', 'https://cig.sc.egov.usda.gov/');
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

describe('Source Water Protection is rendered correctly, pdf', () => {
  const selectedLandscapeInitiative = 8;
  const selectedProjectType = {
    id: 2,
    title: 'Landscape Conservation Initiatives',
    paragraphText: 'NRCS uses Landscape Conservation Initiatives',
    paragraphDescription: 'NRCS uses Landscape Conservation Initiatives',
    imgSrc: '../images/landscapeMap.png',
    imgAlt: 'Map of Landscape Conservation Initiatives in the United States',
  };
  const landscapeInitiativesData = {
    data: [
      {
        lciId: 8,
        lciName: 'Source Water Protection',
        lciResource: '',
        lciImageLink:
          'https://www.nrcs.usda.gov/sites/default/files/2022-09/FY22-Source-Water-Resource-Concern-nrcseprd1878272.pdf',
        lciPageLink:
          'https://www.nrcs.usda.gov/programs-initiatives/source-water-protection',
        lciPageLinkText:
          'Go to the Source Water Protection page for detailed information',
        lciDescription: [
          'Source water ',
          'The 2018 Farm Bill ',
          '•\tIdentifying local priority areas ',
          '•\tProviding increased incentives',
          '•\tDedicating at least 10 percent',
        ],
        lciParentId: null,
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
  test('Should contain an <object> element, lciImageLink is to a pdf', () => {
    expect(screen.getByTestId('pdf-map')).toBeInTheDocument();
  });
  test('Should not contain an <img> element, lciImageLink is to a pdf', () => {
    expect(screen.queryByTestId('img-map')).toBeNull();
  });
});
describe('Source Water Protection is rendered correctly, no pdf', () => {
  const selectedLandscapeInitiative = 8;
  const selectedProjectType = {
    id: 2,
    title: 'Landscape Conservation Initiatives',
    paragraphText: 'NRCS uses Landscape Conservation Initiatives',
    paragraphDescription: 'NRCS uses Landscape Conservation Initiatives',
    imgSrc: '../images/landscapeMap.png',
    imgAlt: 'Map of Landscape Conservation Initiatives in the United States',
  };
  const landscapeInitiativesData = {
    data: [
      {
        lciId: 8,
        lciName: 'Source Water Protection',
        lciResource: '',
        lciImageLink:
          'https://www.nrcs.usda.gov/sites/default/files/2022-09/FY22-Source-Water-Resource-Concern-nrcseprd1878272.jpg',
        lciPageLink:
          'https://www.nrcs.usda.gov/programs-initiatives/source-water-protection',
        lciPageLinkText:
          'Go to the Source Water Protection page for detailed information',
        lciDescription: [
          'Source water ',
          'The 2018 Farm Bill ',
          '•\tIdentifying local priority areas ',
          '•\tProviding increased incentives',
          '•\tDedicating at least 10 percent',
        ],
        lciParentId: null,
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
  test('Should not contain an <object> element, lciImageLink is to a jpg', () => {
    expect(screen.queryByTestId('pdf-map')).toBeNull();
  });
  test('Should contain an <img> element, lciImageLink is to a jpg', () => {
    expect(screen.queryByTestId('img-map')).toBeInTheDocument();
  });
});
