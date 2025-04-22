import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store';
import type { Track } from './types';

interface TracksState {
  items: Track[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TracksState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTracks = createAsyncThunk<Track[]>('tracks/fetchTracks', async () => {
  const response = await axios.get('http://localhost:8000/api/tracks?limit=1000');

  return response.data.data;
});

export const createTrack = createAsyncThunk<
  void,
  {
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage?: string;
  },
  { dispatch: AppDispatch }
>('tracks/createTrack', async (track, { dispatch }) => {
  const res = await fetch('http://localhost:8000/api/tracks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(track),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Create failed: ${msg}`);
  }

  await dispatch(fetchTracks());
});

export const editTrack = createAsyncThunk(
  'tracks/editTrack',
  async (track: {
    id: string;
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage?: string;
  }) => {
    const response = await fetch(`http://localhost:8000/api/tracks/${track.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(track),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTrack = createAsyncThunk('tracks/deleteTrack', async (id: string) => {
  await fetch(`http://localhost:8000/api/tracks/${id}`, {
    method: 'DELETE',
  });
  return id;
});

export const uploadTrackFile = createAsyncThunk(
  'tracks/uploadTrackFile',
  async ({ id, file }: { id: string; file: FormData }) => {
    const res = await fetch(`http://localhost:8000/api/tracks/${id}/upload`, {
      method: 'POST',
      body: file,
    });

    if (!res.ok) throw new Error('Upload failed');

    const updatedTrack = await res.json();
    return updatedTrack;
  }
);

export const removeTrackFile = createAsyncThunk('tracks/removeTrackFile', async (id: string) => {
  const res = await fetch(`http://localhost:8000/api/tracks/${id}/file`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Delete failed');
  return id;
});

export const deleteTracksBulk = createAsyncThunk(
  'tracks/deleteTracksBulk',
  async (ids: string[]) => {
    await fetch(`http://localhost:3000/api/tracks/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    return ids;
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTracksBulk.fulfilled, (state, action) => {
        state.items = state.items.filter((track) => !action.payload.includes(track.id));
      })
      .addCase(removeTrackFile.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload);
        if (index !== -1) {
          state.items[index].audioFile = '';
        }
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.items = state.items.filter((track) => track.id !== action.payload);
      })

      .addCase(editTrack.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(uploadTrackFile.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

export default tracksSlice.reducer;
