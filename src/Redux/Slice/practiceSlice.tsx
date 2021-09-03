import { createSlice } from '@reduxjs/toolkit';

interface IPracticeSlice {
  selectedPracticeCategory: number;
}

const initialState = {
  selectedPracticeCategory: -1,
} as IPracticeSlice;

/* eslint-disable no-param-reassign */
const practiceSlice = createSlice({
  name: 'practiceSlice',
  initialState,
  reducers: {
    setPracticeCategory(state, action) {
      state.selectedPracticeCategory = action.payload;
    },
  },
});
/* eslint-disable no-param-reassign */

export const { setPracticeCategory } = practiceSlice.actions;
export default practiceSlice.reducer;
