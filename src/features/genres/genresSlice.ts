import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// genresSlice.ts (або можна в tracksSlice)
export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  const res = await fetch('http://localhost:8000/api/genres');
  if (!res.ok) throw new Error('Unable to get genres');
  const data = await res.json();
  return data;
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
