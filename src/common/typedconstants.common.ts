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
