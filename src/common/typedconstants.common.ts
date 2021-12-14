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
  disabled: true,
};

export const initialResourceState: any = {
  resources: [],
  disabled: true,
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
  title: 'Accessing Colorado Practice Standards on the NRCS Website',
  firstStep: '1. Go to the',
  secondStep: '2. Select “Colorado” from the state dropdown if it is not already selected',
  thirdStep: '3. On the toolbar below the state selector ensure that “Document Tree” is selected',
  fourthStep: '4. Click “Section 4 - Practice Standards and Supporting Documents”',
  fifthStep: '5. Scroll down the list and select “Cover Crop” this will load the documents related to your practice standard',
};

export const practiceStandardGuideLink = {
  stateConservationPracticeText: `${' '}NRCS Colorado Conservation Practices Website${' '}`,
  stateConservationPracticeLink: `https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849`,
  viewStateConservationPracticeText: `${' '}View NRCS Colorado Conservation Practices${' '}`,
  viewStateConservationPracticeLink: `https://efotg.sc.egov.usda.gov/#/state/`,
}
