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

export interface IConservationPracticeDropdown {
  practice: Array<any>;
  disabled: boolean;
}

export interface IStateDropdownOption {
  stateCode: string;
  stateAbbreviation: string;
  stateNameDisplay: string;
}

export interface IAccordion {
  id: number;
  practiceCategory: string;
  practiceCategoryDesc: string;
  practiceCategoryLink: string;
  practice: string;
  practiceDesc: string;
  practiceLink: string;
}
