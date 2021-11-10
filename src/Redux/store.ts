import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session' // defaults to localStorage for web
import { api } from './services/api';
import disableSlice from './Slice/disableSlice';
import pdfGenSlice from './Slice/pdfGenSlice';
import practiceSlice from './Slice/practiceSlice';
import stateSlice from './Slice/stateSlice';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    disableSlice,
    pdfGenSlice,
    practiceSlice,
    stateSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [''], // State will not be persisted
  whitelist: ['stateSlice', 'practiceSlice', 'disableSlice'] // only State will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

//! Used for refetch on focus or refetch on reconnect
setupListeners(store.dispatch);

//! Helps TypeScript to identify what kind of state is stored in Store object and stops any typescript compilation error
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const presistedStore = persistStore(store)