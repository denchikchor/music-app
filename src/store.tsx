import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './features/tracks/trackSlice';
import genresReducer from './features/genres/genresSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
