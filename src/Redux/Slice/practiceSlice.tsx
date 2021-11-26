import { createSlice } from '@reduxjs/toolkit';

interface IPracticeSlice {
  selectedPracticeCategory: number;
  selectedSpecficPractice: number;
  searchInput: any;
  searchInfo?: any;
  landUseSet?: any;
}
const initialLandUse = {
  'Other Farm and Rural Land': false,
  Cropland: false,
  'Developed land/Urban Ag': false,
  Forestland: false,
  Pasture: false,
  Rangeland: false,
  Protected: false,
};

const defaultSearchInput: any = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
};
const defaultSearchInfo: any = {
  resource_concern_category: null,
  resource_concern: null,
  practice_category: null,
  practice: null,
  state: null,
  land_use_list: null,
};

const initialState = {
  selectedPracticeCategory: -1,
  selectedSpecficPractice: -1,
  searchInput: defaultSearchInput,
  searchInfo: defaultSearchInfo,
  landUseSet: initialLandUse,
} as IPracticeSlice;

/* eslint-disable no-param-reassign */
const practiceSlice = createSlice({
  name: 'practiceSlice',
  initialState,
  reducers: {
    setPracticeCategory(state, action) {
      state.selectedPracticeCategory = action.payload;
    },
    setSpecificPractice(state, action) {
      state.selectedSpecficPractice = action.payload;
    },
    setSearch(state, action) {
      state.searchInput = action.payload;
    },
    setSearchInfo(state, action) {
      state.searchInfo = action.payload;
    },
    setLandUse(state, action) {
      state.landUseSet = action.payload;
    },
  },
});

/* eslint-disable no-param-reassign */
export const {
  setPracticeCategory,
  setSpecificPractice,
  setSearch,
  setSearchInfo,
  setLandUse,
} = practiceSlice.actions;
export default practiceSlice.reducer;
