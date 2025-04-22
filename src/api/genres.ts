import axios from 'axios';
import { API_BASE } from './config';

// Отримання списку жанрів
export const getGenres = (): Promise<string[]> =>
  axios.get<string[]>(`${API_BASE}/genres`).then((res) => res.data);
