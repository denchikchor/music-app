import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGenres as fetchGenresApi } from '../../api/genres';

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  return fetchGenresApi();
});

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    items: [] as string[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default genresSlice.reducer;
