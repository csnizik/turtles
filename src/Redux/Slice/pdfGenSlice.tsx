import { createSlice } from '@reduxjs/toolkit';

interface IdisableState {
  enablePdfGen: boolean;
  isPdTableauEmpty: boolean;
  isEipcTableauEmpty: boolean;
}

const initialState = {
  enablePdfGen: false,
  isPdTableauEmpty: false,
  isEipcTableauEmpty: false,
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
    eipcTabStatus(state, action) {
      state.isEipcTableauEmpty = action.payload;
    }
  },
});
/* eslint-disable no-param-reassign */

export const { disablePdfGenState, enablePdfGenState, pdTabStatus, eipcTabStatus } =
  pdfGenSlice.actions;
export default pdfGenSlice.reducer;
