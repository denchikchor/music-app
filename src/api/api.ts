import axios from 'axios';
import type { Track } from '../features/tracks/types';

export const API_BASE = 'http://localhost:8000/api';

// Options for creating a new track
export interface CreateTrackPayload {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage?: string;
}

// Track editing options
export interface EditTrackPayload extends CreateTrackPayload {
  id: string;
}

// Get track list
export const getTracks = (limit = 1000): Promise<Track[]> =>
  axios
    .get<{ data: Track[] }>(`${API_BASE}/tracks?limit=${limit}`)
    .then((res) => res.data.data);

// Create a new track
export const createTrack = (payload: CreateTrackPayload): Promise<void> =>
  axios.post(`${API_BASE}/tracks`, payload).then(() => {});

// Edit an existing track
export const editTrack = (payload: EditTrackPayload): Promise<Track> =>
  axios
    .put<Track>(`${API_BASE}/tracks/${payload.id}`, payload)
    .then((res) => res.data);

// Delete track by ID
export const deleteTrack = (id: string): Promise<void> =>
  axios.delete(`${API_BASE}/tracks/${id}`).then(() => {});

// Upload audio file for track
export const uploadTrackFile = (id: string, file: FormData): Promise<Track> =>
  axios.post<Track>(`${API_BASE}/tracks/${id}/upload`, file).then((res) => res.data);

// Delete track audio file
export const removeTrackFile = (id: string): Promise<void> =>
  axios.delete(`${API_BASE}/tracks/${id}/file`).then(() => {});
