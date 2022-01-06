import { createSlice } from '@reduxjs/toolkit';

interface IdisableState {
  enablePdfGen: boolean;
  isPdTableauEmpty: boolean;
}

const initialState = {
  enablePdfGen: false,
  isPdTableauEmpty: false,
} as IdisableState;

/* eslint-disable no-param-reassign */
const pdfGenSlice = createSlice({
  name: 'pdfGen',
  initialState,
  reducers: {
    disablePdfGenState(state) {
      state.enablePdfGen = false;
    },
    enablePdfGenState(state) {
      state.enablePdfGen = true;
    },
    pdTabStatus(state, action) {
      state.isPdTableauEmpty = action.payload;
    },
  },
});
/* eslint-disable no-param-reassign */

export const { disablePdfGenState, enablePdfGenState, pdTabStatus } =
  pdfGenSlice.actions;
export default pdfGenSlice.reducer;
