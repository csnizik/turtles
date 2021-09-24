import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from './services/api';
import disableSlice from './Slice/disableSlice';
import pdfGenSlice from './Slice/pdfGenSlice';
import practiceSlice from './Slice/practiceSlice';
import stateSlice from './Slice/stateSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    disableSlice,
    pdfGenSlice,
    practiceSlice,
    stateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

//! Used for refetch on focus or refetch on reconnect
setupListeners(store.dispatch);

//! Helps TypeScript to identify what kind of state is stored in Store object and stops any typescript compilation error
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
