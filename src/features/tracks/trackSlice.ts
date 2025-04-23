import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Track } from './types';
import type { AppDispatch } from '../../store';
import type { CreateTrackPayload, EditTrackPayload } from '../../api/tracks';
import {
  getTracks,
  createTrack as apiCreateTrack,
  editTrack as apiEditTrack,
  deleteTrack as apiDeleteTrack,
  uploadTrackFile as apiUploadTrackFile,
  removeTrackFile as apiRemoveTrackFile,
} from '../../api/tracks';

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

// Loading track list
export const fetchTracks = createAsyncThunk<Track[], void>('tracks/fetchTracks', async () => {
  const tracks = await getTracks();
  return tracks;
});

// Creating a new track
export const createTrack = createAsyncThunk<void, CreateTrackPayload, { dispatch: AppDispatch }>(
  'tracks/createTrack',
  async (payload, { dispatch }) => {
    await apiCreateTrack(payload);
    await dispatch(fetchTracks());
  }
);

// Editing a track
export const editTrack = createAsyncThunk<Track, EditTrackPayload>(
  'tracks/editTrack',
  async (payload) => {
    const updated = await apiEditTrack(payload);
    return updated;
  }
);

// Deleting a single track
export const deleteTrack = createAsyncThunk<string, string>('tracks/deleteTrack', async (id) => {
  await apiDeleteTrack(id);
  return id;
});

// Uploading an audio file for a track
export const uploadTrackFile = createAsyncThunk<Track, { id: string; file: FormData }>(
  'tracks/uploadTrackFile',
  async ({ id, file }) => {
    const updated = await apiUploadTrackFile(id, file);
    return updated;
  }
);

// deleting an audio track file
export const removeTrackFile = createAsyncThunk<string, string>(
  'tracks/removeTrackFile',
  async (id) => {
    await apiRemoveTrackFile(id);
    return id;
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load tracks';
      })
      // Create
      .addCase(createTrack.pending, (state, action) => {
        state.status = 'loading';
      
        const tempId = 'temp-' + Date.now();
      
        const newTrack: Track = {
          id: tempId,
          title: action.meta.arg.title,
          artist: action.meta.arg.artist,
          album: action.meta.arg.album,
          genres: action.meta.arg.genres,
          coverImage: action.meta.arg.coverImage || '',
          audioFile: '',
          slug: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      
        state.items.unshift(newTrack);
      })
      
      .addCase(createTrack.fulfilled, (state) => {
        state.status = 'succeeded';
        state.items = state.items.filter((t) => !t.id.startsWith('temp-'));
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Create track failed';
      
        state.items = state.items.filter((t) => !t.id.startsWith('temp-'));
      })
      // Edit
      .addCase(editTrack.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // Optimistic delete: remove track from UI before server confirms
      .addCase(deleteTrack.pending, (state, action) => {
        const id = action.meta.arg;
        state.items = state.items.filter((t) => t.id !== id);
      })
      .addCase(deleteTrack.rejected, (state, action) => {
        console.error('❌ Помилка при видаленні треку:', action.error.message);
      })
      // Upload file
      .addCase(uploadTrackFile.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((t) => t.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      // Remove file
      .addCase(removeTrackFile.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload);
        if (idx !== -1) state.items[idx].audioFile = '';
      });
  },
});

export default tracksSlice.reducer;
