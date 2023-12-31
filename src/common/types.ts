/* eslint-disable camelcase */
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
  practiceImage: string;
  practiceOverview: string;
  practiceInfo: string;
  practiceName: string;
  practiceCode: string;
}

export interface ICountyList {
  stateCountyCode: string;
  stateCode: string;
  stateAbbr: string;
  stateName: string;
  countyCode: string;
  countyDisplay: string;
}

export interface ILandUse {
  'Other Farm and Rural Land': boolean;
  Cropland: boolean;
  'Developed land/Urban Ag': boolean;
  Forestland: boolean;
  Pasture: boolean;
  Rangeland: boolean;
  Protected: boolean;
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
  practice?: Array<IPractice>;
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

export interface ISearchData {
  resource_concern_category_id?: number | null;
  resource_concern_id?: number | null;
  practice_category_id?: number | null;
  practice_id?: number | null;
  state_county_code?: string | null;
  land_use_list?: string | null;
  practices?: Array<Practice> | null | undefined;
  free_text?: string | null;
}

export interface ISearchInfo {
  resource_concern_category?: string | null;
  resource_concern?: string | null;
  practice_category?: string | null;
  practice?: string | null;
  state?: string | null;
  land_use_list?: string | null;
  free_text?: string | null;
}

export interface IPracticeVideo {
  videoId: number;
  videoName: string;
  videoDescription: string;
  videoLink: string;
}

export interface IRCRequestBody {
  stateCode: string;
  practiceId: number;
}

export interface IRCLandUse {
  landUseId: number;
  landUseName: string;
  landUseIcon: string;
}

export interface IRCConcern {
  rcId: number;
  rcName: string;
  rcDescription: string;
  relatedLandUses: Array<IRCLandUse>;
}

export interface IRCResult {
  rcCategoryId: number;
  rcCategoryName: string;
  resourceConcerns: Array<IRCConcern>;
}

export interface IRCCategory {
  result: Array<IRCResult>;
}

export interface IConservationPracticeSections {
  sectionId: number;
  sectionName: string;
  anchorLink: string;
}

export interface IAssociatedPracticeList {
  practiceId: number;
  practiceCode: string;
  practiceName: string;
  practiceDescription: string;
  practiceCategoryId: number;
}

export interface IProjectType {
  title: string;
  description: string;
  map: string;
}

/*eslint camelcase: 0*/
export interface ILandscapeInitiative {
  lciId: number;
  lciName: string;
  lciResource: string;
  lciImageLink: string;
  lciPageLink: string;
  lciPageLinkText: string;
  lciDescription: Array<string>;
  lciParentId: number;
}

export interface IIndividualResourceConcern{
  resourceConcernId: number;
  resourceConcernCategoryId: number;
  rcSwapacategoryId: number;
  resourceConcernName: string;
  resourceConcernDescription: string;
}

export interface ICPPEScore{
  cppeEffectValue: number;
  practiceCode: string;
  practiceName: string;
  practiceInfo: string;
  practiceCategory: number;
  rationale: string;
  practiceCategoryId: number;
  practiceId: number;
}

export interface ICPPEPractice{
  resourceConcernId: number;
  resourceConcernName: string;
  resourceConcernDescription: string;
  practiceName: string;
  practiceCode: string;
  cppeEffectValue: number;
  rationale: string;
}