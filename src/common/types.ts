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

export interface IAllConservationPractice {
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

export type Practice = {
  practiceId: number;
  practiceName: string;
  practiceDescription: string;
  practiceLink: string;
};

export interface IPractice {
  practiceCategoryId: number;
  practiceCategoryName: string;
  practiceCode: string;
  practiceName: string;
  practiceId: number;
}
export interface IPracticeDropdown {
  practice: Array<IPractice>;
  disabled: boolean;
}

export interface IPracticeCategory {
  practiceCategoryId: number;
  practiceCategoryName: string;
  practiceCategoryDisplay: string;
}
export interface IPracticeCategoryDropdown {
  practice: Array<IPracticeCategory>;
  disabled: boolean;
}

export interface IStateDropdownOption {
  stateCode: string;
  stateAbbreviation: string;
  stateNameDisplay: string;
}

export interface ILandUseOption {
  landUseCategoryID: number;
  landUseCategoryName: string;
  landUseCategoryDesc: string;
}
