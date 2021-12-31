import ReportPreview from './ReportPreview';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

xdescribe('ReportPreview is rendered correctly', () => {
  const selectedStateCode = { stateCode: '00' };
  const choiceInputs = {
    input1: true,
    input2: true,
    input3: true,
  };
  const reportPreviewData = {};
  const practiceId = 10;
  const rcRef = {};
  const rcTreatedInputs = new Set();
  const selectedProjInitData = [
    {
      title: 'Conservation Innovation Grants',
      data: [
        {
          projectId: 79,
          projectTitle: 'Cover Crops: Demonstrating Full Value',
          projectDescription:
            'North Jersey RC&D (NJRCD) this proposal will help farmers realize the full\nbenefits of Cover Crops thereby stimulating additional soil health system adoption.',
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
          projectDescription: 'The purpose of this project these environments.',
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
            'Great Lakes Restoration Initiative  lorum ipsum.',
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
      <ReportPreview
        selectedStateCode={selectedStateCode}
        choiceInputs={choiceInputs}
        reportPreviewData={reportPreviewData}
        practiceId={practiceId}
        rcRef={rcRef}
        rcTreatedInputs={rcTreatedInputs}
        selectedProjInitData={selectedProjInitData}
      />
    );
  });
  test('Should display the contents of ReportPreview', () => {
    expect(screen.getByTestId('preview')).toBeDefined();
  });
  test('Should display the contents of Conservation Overview', () => {
    const conservOver = screen.getByTestId('conservation-overview');
    expect(conservOver.childNodes.length).toEqual(1);
  });
  test('Should display the contents of ResourceConcernTreated', () => {
    expect(screen.getByTestId('resource-concern-treated')).toBeVisible();
  });
  test('Should display the contents of ImplementationExtent;', () => {
    const impExt = screen.getByTestId('implementation-extent');
    expect(impExt.childNodes.length).toEqual(1);
  });
  test('Should display the contents of SpecificationsAndTools;', () => {
    const specTools = screen.getByTestId('spec-tools');
    expect(specTools.childNodes.length).toEqual(1);
  });
  test('Should display the contents of Projects and Initiatives;', () => {
    const projInit = screen.getByTestId('proj-init');
    expect(projInit.childNodes.length).toEqual(1);
  });
});
