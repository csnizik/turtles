import { createSlice } from '@reduxjs/toolkit';

interface IResourceConcernSlice {
  selectedResourceConcernCategory: number;
  selectedSpecficResourceConcern: number;
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
  resourceConcern_category_id: null,
  resourceConcern_id: null,
  state_county_code: null,
  land_use_list: null,
  free_text: null,
};
const defaultSearchInfo: any = {
  resource_concern_category: null,
  resource_concern: null,
  resourceConcern_category: null,
  resourceConcern: null,
  state: null,
  land_use_list: null,
  free_text: null,
};

const initialState = {
  selectedResourceConcernCategory: -1,
  selectedSpecficResourceConcern: -1,
  searchInput: defaultSearchInput,
  searchInfo: defaultSearchInfo,
  landUseSet: initialLandUse,
} as IResourceConcernSlice;

/* eslint-disable no-param-reassign */
const resourceConcernSlice = createSlice({
  name: 'resourceConcernSlice',
  initialState,
  reducers: {
    setResourceConcernCategory(state, action) {
      state.selectedResourceConcernCategory = action.payload;
    },
    setSpecificResourceConcern(state, action) {
      state.selectedSpecficResourceConcern = action.payload;
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
  setResourceConcernCategory,
  setSpecificResourceConcern,
  setSearch,
  setSearchInfo,
  setLandUse,
} = resourceConcernSlice.actions;
export default resourceConcernSlice.reducer;
