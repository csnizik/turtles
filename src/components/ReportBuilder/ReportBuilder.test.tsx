import ReportBuilder from './ReportBuilder';
import {
  fireEvent,
  cleanup,
  render,
  screen,
} from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});
const setRcTreatedInputMock = jest.fn();
const swapaData = {
  result: [
    { rcCategoryId: 3, rcCategoryName: 'Air' },
    { rcCategoryId: 2, rcCategoryName: 'Water' },
  ],
};

const reportPreviewData = {};
const choiceInputs = {
  input1: false,
  input2: false,
  input3: false,
  input5: false,
};
const setChoiceInputs = () => {};
let rcTreatedInputs = new Set();
const setRcTreatedInput = setRcTreatedInputMock;
const setSelectedProjInitData = () => {};
const getRCTreatedComponent = () => {};
const handleGeneratePdf = () => {};
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
describe('ReportBuilder is rendered correctly', () => {
  beforeEach(() => {
    render(
      <ReportBuilder
        swapaData={swapaData}
        reportPreviewData={reportPreviewData}
        choiceInputs={choiceInputs}
        setChoiceInputs={setChoiceInputs}
        rcTreatedInputs={rcTreatedInputs}
        setRcTreatedInput={setRcTreatedInput}
        getRCTreatedComponent={getRCTreatedComponent}
        handleGeneratePdf={handleGeneratePdf}
        projectsInitiativesData={projectsInitiativesData}
        setSelectedProjInitData={setSelectedProjInitData}
      />
    );
  });

  test('Should display the contents of ReportBuilder', () => {
    expect(screen.queryByTestId('builder')).toBeDefined();
  });
  test('Should display the SWAPA resources in the data plus "All"', () => {
    expect(screen.getByText('Air')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
  });
  test('Should display the projects and initiatives', () => {
    expect(
      screen.getByText('Conservation Innovation Grants')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Landscape Conservation Initiatives')
    ).toBeInTheDocument();
  });
  test('Should select all items in list if All selected and pass to parent through setRcTreatedInput', () => {
    fireEvent.click(screen.getByTestId('all-option'));
    // 3 is id for Air selection, 2 is id for Water selection
    expect(setRcTreatedInput).toBeCalledWith(new Set([3, 2]));
  });
  test('Should take a single selection and pass to parent through setRcTreatedInput', () => {
    fireEvent.click(screen.getByTestId('Water-option'));
    // 2 is id for Water selection
    expect(setRcTreatedInput).toBeCalledWith(new Set([2]));
  });
});

describe('ReportBuilder is rendered correctly', () => {
  test('Should display all Resource Concerns Treated checked if All option is selected', () => {
    render(
      <ReportBuilder
        swapaData={swapaData}
        reportPreviewData={reportPreviewData}
        choiceInputs={choiceInputs}
        setChoiceInputs={setChoiceInputs}
        rcTreatedInputs={new Set([3, 2])}
        setRcTreatedInput={setRcTreatedInput}
        getRCTreatedComponent={getRCTreatedComponent}
        handleGeneratePdf={handleGeneratePdf}
        projectsInitiativesData={projectsInitiativesData}
        setSelectedProjInitData={setSelectedProjInitData}
      />
    );
    // only 2 Resource Categories in list, 3 = air, 2 = water
    expect(screen.getByTestId('all-option')).toBeChecked();
    expect(screen.queryByTestId('Air-option')).toBeChecked();
    expect(screen.queryByTestId('Water-option')).toBeChecked();
  });
});

describe('ReportBuilder is rendered correctly', () => {
  test('Should display All option not checked if one other option was not selected in Resource Concerns Treated', () => {
    render(
      <ReportBuilder
        swapaData={swapaData}
        reportPreviewData={reportPreviewData}
        choiceInputs={choiceInputs}
        setChoiceInputs={setChoiceInputs}
        rcTreatedInputs={new Set([3])}
        setRcTreatedInput={setRcTreatedInput}
        getRCTreatedComponent={getRCTreatedComponent}
        handleGeneratePdf={handleGeneratePdf}
        projectsInitiativesData={projectsInitiativesData}
        setSelectedProjInitData={setSelectedProjInitData}
      />
    );
    expect(screen.getByTestId('all-option')).not.toBeChecked();
    expect(screen.queryByTestId('Air-option')).toBeChecked();
    expect(screen.queryByTestId('Water-option')).not.toBeChecked();
  });
});
