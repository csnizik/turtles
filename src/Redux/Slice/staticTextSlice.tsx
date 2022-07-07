import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staticData: null,
};

/* eslint-disable no-param-reassign */
const staticTextSlice = createSlice({
  name: 'staticTextSlice',
  initialState,
  reducers: {
    setStaticText(state, action) {
      state.staticData = action.payload;
    },
  },
});

/* eslint-disable no-param-reassign */
export const { setStaticText } = staticTextSlice.actions;
export default staticTextSlice.reducer;
