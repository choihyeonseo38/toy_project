// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
