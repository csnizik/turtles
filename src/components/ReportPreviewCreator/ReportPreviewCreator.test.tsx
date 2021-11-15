import userEvent from '@testing-library/user-event';
import ReportPreviewCreator from './ReportPreviewCreator';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

describe('ReportPreviewCreator is rendered correctly', () => {
  const selectedStateCode = {
    stateCode: '00',
  };
  const openModal = true;
  // const handleCreateReport = () => {};
  const cleanModal = false;
  const projectsInitiativesData = [
    {
      title: 'Conservation Innovation Grants',
      data: [
        {
          projectId: 79,
          projectTitle: 'Cover Crops: Demonstrating Full Value',
          projectDescription:
            'North Jersey RC&D (NJRCD) proposes a soil health demonstration that compares typical\nnortheastern US cover crop termination practice (termination in early to mid- spring, using\nherbicide, weeks before planting) against innovative methods of delaying cover crop termination\nand cash crop planting. These innovative methods include planting into (1) a green living cover\ncrop, (2) a mature cover crop terminated using a roller crimper and (3) a cover crop intensively\ngrazed by livestock. These strategies maximize soil cover, biodiversity, and the presence of\nliving roots in annual crop systems, ultimately increasing the agronomic and economic value of\ncover crop to agricultural producers.\nUsing a paired study design, three treatments (aforementioned cover crop termination methods)\nwill be compared against a control (existing termination practices) on 25 farms (4000 acres total\nof northern New Jersey cropland). Using a combination of soil samples and field assessments,\nfarm data, and farmer interviews, NJRCD and partners will compare environmental, economic,\nand social impacts of treatments. By identifying, documenting, and evaluating regionally\nsuccessful cover crop termination approaches, this proposal will help farmers realize the full\nbenefits of Cover Crops thereby stimulating additional soil health system adoption.',
          projectOwner: 'North Jersey RC&D',
          projectLink:
            'https://cig.sc.egov.usda.gov/projects/cover-crops-demonstrating-full-value',
          statesInvolved: ['NJ'],
          awardeeYear: 2019,
        },
        {
          projectId: 61,
          projectTitle:
            'Demonstrate the potential of cover crop and forage mixtures to improve soil quality',
          projectDescription:
            'The purpose of this project is to demonstrate and quantify the impacts of soil-health improving management practices including Cover Crops, crop rotations, and reduced tillage on a range of soil properties and processes – including nutrient cycling and soil water availability in the semi-arid environments of the western Great Plains. On- farm demonstration sites and comparison studies will be established in eastern Colorado, western Kansas and western Nebraska to show farmers how these management practices can be successfully adopted in these environments.',
          projectOwner: 'Colorado State University',
          projectLink: null,
          statesInvolved: ['CO'],
          awardeeYear: 2015,
        },
      ],
    },
    {
      title: 'Landscape Conservation Initiatives',
      data: [
        {
          initiativeId: 0,
          initiativeTitle: 'Great Lakes Restoration Initiative',
          initiativeDescription:
            'Great Lakes Restoration Initiative  lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla. Additional contextual information lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor.',
          initiativeOwner: '',
          statesInvolved: [],
          initiativeYear: '',
        },
        {
          initiativeId: 1,
          initiativeTitle: 'Rangelands Initiative Efforts',
          initiativeDescription:
            'This project aims to conserve native tree species within midwests range lands.',
          initiativeOwner: '',
          statesInvolved: [],
          initiativeYear: '',
        },
      ],
    },
  ];
  beforeEach(() => {
    render(
      <ReportPreviewCreator
        selectedStateCode={selectedStateCode}
        openModal={openModal}
        // handleCreateReport={handleCreateReport}
        cleanModal={cleanModal}
        projectsInitiativesData={projectsInitiativesData}
      />
    );
  });
  test('Should display the contents of ReportPreviewCreator', () => {
    expect(screen.queryByTestId('report-builder')).toBeDefined();
  });
  test('Should display the contents of ReportPreviewCreator - ReportBuilder', () => {
    expect(screen.queryByTestId('report-builder')).toBeDefined();
  });
  test('Should display the contents of ReportPreviewCreator - ReportPreview', () => {
    expect(screen.queryByTestId('report-preview')).toBeDefined();
  });
  test("checking 'Conservation Innovation Grants' checkbox should show Conservation Innovation Grants data in Preview", () => {
    const ckBox = screen.getByRole('checkbox', {
      name: /conservation innovation grants/i,
    });
    userEvent.click(ckBox);
    const results = screen.getAllByText(
      'Cover Crops: Demonstrating Full Value'
    );
    expect(results[0]).toBeInTheDocument();
    userEvent.click(ckBox);
    expect(results[0]).not.toBeInTheDocument();
  });
  test("checking 'Landscape Conservation Initiatives' checkbox should show Landscape Conservation Initiatives data in Preview", () => {
    const ckBox = screen.getByRole('checkbox', {
      name: /landscape conservation initiatives/i,
    });
    userEvent.click(ckBox);
    const results = screen.getAllByText('Great Lakes Restoration Initiative');
    expect(results[0]).toBeInTheDocument();
    userEvent.click(ckBox);
    expect(results[0]).not.toBeInTheDocument();
  });
});
