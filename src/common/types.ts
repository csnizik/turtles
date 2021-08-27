export interface IResourceConcernList {
  resourceConcernId: number;
  resourceConcernName: string;
  resourceConcernDescription: string;
  activeRecordInd: string;
  createdBy: string;
  zOrder: number;
  highlighted: boolean;
  image: string;
}

export interface IConservationPractice {
  practiceId: number;
  practiceCode: string;
  prcaticeImage?: string;
  practiceOverview: string;
  practiceInfo: string;
}

export interface ICountyList {
  stateCountyCode: string;
  stateCode: string;
  stateAbbr: string;
  stateName: string;
  countyCode: string;
  countyDisplay: string;
}

export interface IConservationPracticeDropdown {
  practice: Array<any>;
  disabled: boolean;
}

export interface IStateDropdownOption {
  stateCode: string;
  stateAbbreviation: string;
  stateNameDisplay: string;
}

export type Practice = {
  practiceId: number,
  practiceName: string,
  practiceDescription: string,
  practiceLink: string,
}

export interface IAccordion {
    practiceCategoryId: number,
    stateAbbr: string,
    landUseName: string,
    conservationPracticeSelected: string,
    resourceConcernSelected: number,
    practiceCategoryName: string,
    practiceCategoryDescription: string,
    practiceCategoryLink: string,
    practices: Array<Practice>
}

export interface ILandUseOption {
  landUseCategoryID: number;
  landUseCategoryName: string;
  landUseCategoryDesc: string;
}
