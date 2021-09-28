import { createSlice } from '@reduxjs/toolkit';

interface IdisableState {
  enablePdfGen: boolean;
}

const initialState = {
  enablePdfGen: false,
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
  },
});
/* eslint-disable no-param-reassign */

export const {
  disablePdfGenState,
  enablePdfGenState,
} = pdfGenSlice.actions;
export default pdfGenSlice.reducer;
