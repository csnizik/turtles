export interface ISearchOptionMap {
  [key: string]: any;
}
export const searchOptionMap: ISearchOptionMap = {
  Overview: { id: 0, displayName: 'Overview' },
  ConservationPractices: { id: 1, displayName: 'Conservation Practices' },
  ProjectsAndInitiatives: {
    id: 2,
    displayName: 'Projects And Initiatives',
  },
};

export const ConservationPracticeSections: any = [
  {
    sectionId: 0,
    sectionName: 'Resource Concerns Treated',
    anchorLink: '#ResourceConcernsTreated',
  },
  {
    sectionId: 1,
    sectionName: 'Support for this Practice',
    anchorLink: '#SupportPractice',
  },
  {
    sectionId: 2,
    sectionName: 'Practice Specifications and Tools',
    anchorLink: '#PracticeSpecifications',
  },
  // TO DO Impacts: Put back in the next PI
  // {
  //   sectionId: 3,
  //   sectionName: 'Impacts of Applying this Practice',
  //   anchorLink: '#ImpactsPractice',
  // },
  {
    sectionId: 3,
    sectionName: 'Practice Projects & Initiatives',
    anchorLink: '#ProjectsInitiatives',
  },
];

export const intialPracticeState: any = {
  practice: [],
};

export const initialResourceState: any = {
  resources: [],
};

export const initialLandUse = {
  'Other Farm and Rural Land': false,
  Cropland: false,
  'Developed land/Urban Ag': false,
  Forestland: false,
  Pasture: false,
  Rangeland: false,
  Protected: false,
};

export const practiceStandardGuideText = {
  title: "Accessing this state's Practice Standards on the NRCS Website",
  firstStep: '1. Go to the',
  secondStep:
    '2. On the toolbar below the state selector ensure that “Document Tree” is selected',
  thirdStep:
    '3. Click “Section 4 - Practice Standards and Supporting Documents”',
  fourthStep: '4. Select Conservation Practice Standards & Support Documents',
  fifthStep:
    '5. Select your desired practice standard from the list, this will load the documents related to your practice standard',
};

export const practiceStandardGuideLink = {
  stateConservationPracticeText: `${' '}NRCS Conservation Practices Website${' '}`,
  viewStateConservationPracticeText: `${' '}View this State's Conservation Practices${' '}`,
  viewStateConservationPracticeLink: `https://efotg.sc.egov.usda.gov/#/state/`,
  webpagePromptText: `Go Straight to this State’s Field Office Technical Guide`,
  pdfReportPromptText: `State Specific National Conservation Practices`,
};

export const tableauGraph = {
  RegionalConservationPractice: {
    id: 0,
    displayName: 'Regional Conservation Practice',
    link: 'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticeListbyAcres/Dashboard1.png?Stabbr',
  },
  ConservationPracticeCategory: {
    id: 1,
    displayName: 'Conservation Practice Category',
    link: 'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticesbyYearforStateandMeasure/Dashboard1.png?Stabbr',
  },
  PracticeDetail: {
    id: 2,
    displayName: 'Practice Detail',
    link: 'https://publicdashboards-dev.dl.usda.gov/t/FPAC_PUB/views/CPDPracticebyProgramOverYears/Dashboard1?Stabbr',
  },
  EQUIPOpenData: {
    id: 3,
    displayName: 'Equip Open Data',
    link: 'https://publicdashboards-dev.d1.usda.gov/t/FPAC_PUB/views/CPDPracticebyProgramOverYears/Dashboard1.png?Stabbr',
  },
};
