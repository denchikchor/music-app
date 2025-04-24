import axios from 'axios';
import { API_BASE } from './config';

export const getGenres = (): Promise<string[]> =>
  axios.get<string[]>(`${API_BASE}/genres`).then((res) => res.data);
