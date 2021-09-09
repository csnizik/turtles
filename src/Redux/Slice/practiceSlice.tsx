import { createSlice } from '@reduxjs/toolkit';

interface IPracticeSlice {
  selectedPracticeCategory: number;
  selectedSpecficPractice: number;
  searchInput: any;
}

const defaultSearchInput: any = {
  resource_concern_category_id: null,
  resource_concern_id: null,
  practice_category_id: null,
  practice_id: null,
  state_county_code: null,
  land_use_list: null,
};

const initialState = {
  selectedPracticeCategory: -1,
  selectedSpecficPractice: -1,
  searchInput: defaultSearchInput,
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
    setSearchInput(state, action) {
      state.searchInput = action.payload;
    },
  },
});

/* eslint-disable no-param-reassign */
export const { setPracticeCategory, setSpecificPractice, setSearchInput } =
  practiceSlice.actions;
export default practiceSlice.reducer;
