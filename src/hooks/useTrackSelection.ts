import { useState } from 'react';
import { useAppDispatch } from './redux-hook';
import { deleteTrack } from '../features/tracks/trackSlice';
import { PAGE_SIZE } from '../constants/pagination';

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

  const handleSelectAll = (ids: string[]) => {
    setSelectedTracks(ids);
  };

  const handleBulkDelete = (
    currentPage: number,
    totalTracks: number,
    setCurrentPage: (page: number) => void
  ) => {
    selectedTracks.forEach((id) => dispatch(deleteTrack(id)));

    const remainingCount = totalTracks - selectedTracks.length;
    const newTotalPages = Math.ceil(remainingCount / PAGE_SIZE);

    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

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
