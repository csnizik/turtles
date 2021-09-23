import { createSlice } from '@reduxjs/toolkit';

interface IdisableResourceDropdown {
  disableResource: boolean;
  disablePractice: boolean;
}

const initialState = {
  disableResource: false,
  disablePractice: false,
} as IdisableResourceDropdown;

/* eslint-disable no-param-reassign */
const disableSlice = createSlice({
  name: 'disable',
  initialState,
  reducers: {
    disableResourceDropdown(state) {
      state.disableResource = true;
    },
    disablePracticeDropdown(state) {
      state.disablePractice = true;
    },
    enableResourceDropdown(state) {
      state.disableResource = false;
    },
    enablePracticeDropdown(state) {
      state.disablePractice = false;
    },
  },
});
/* eslint-disable no-param-reassign */

export const {
  disableResourceDropdown,
  disablePracticeDropdown,
  enableResourceDropdown,
  enablePracticeDropdown,
} = disableSlice.actions;
export default disableSlice.reducer;
