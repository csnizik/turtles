import { createSlice } from '@reduxjs/toolkit';

interface IdisableState {
  disableResource: boolean;
  disablePractice: boolean;
}

const initialState = {
  disableResource: false,
  disablePractice: false,
} as IdisableState;

/* eslint-disable no-param-reassign */
const disableSlice = createSlice({
  name: 'disable',
  initialState,
  reducers: {
    disableState(state) {
      state.disableResource = true;
    },
    disableSecondState(state) {
      state.disablePractice = true;
    },
    enableState(state) {
      state.disableResource = false;
    },
    enableSecondState(state) {
      state.disablePractice = false;
    },
  },
});
/* eslint-disable no-param-reassign */

export const {
  disableState,
  disableSecondState,
  enableState,
  enableSecondState,
} = disableSlice.actions;
export default disableSlice.reducer;
