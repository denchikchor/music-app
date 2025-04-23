import { useState } from 'react';
import { useAppDispatch } from './redux-hook';
import { deleteTrack } from '../features/tracks/trackSlice';

export const useTrackSelection = () => {
  const dispatch = useAppDispatch();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const toggleSelectionMode = () => {
    setSelectionMode((prev) => !prev);
    setSelectedTracks([]);
  };

  const toggleTrackSelection = (id: string) => {
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (allIds: string[]) => {
    setSelectedTracks(allIds);
  };

  const handleBulkDelete = () => {
    selectedTracks.forEach((id) => dispatch(deleteTrack(id)));
    setSelectedTracks([]);
    setSelectionMode(false);
  };

  return {
    selectionMode,
    selectedTracks,
    toggleSelectionMode,
    toggleTrackSelection,
    handleSelectAll,
    handleBulkDelete,
  };
};
