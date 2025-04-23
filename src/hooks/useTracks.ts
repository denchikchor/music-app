import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useTracks = () => {
  const tracks = useSelector((state: RootState) => state.tracks.items);
  const status = useSelector((state: RootState) => state.tracks.status);
  return { tracks, status };
};
