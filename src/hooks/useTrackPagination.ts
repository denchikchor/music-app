import { useState } from 'react';
import type { Track } from '../features/tracks/types';
import { PAGE_SIZE } from '../constants/pagination';

interface UseTrackPaginationResult {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentPlayingIndex: number | null;
  setCurrentPlayingIndex: (index: number | null) => void;
  paginatedTracks: Track[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
  handleTrackEnd: (index: number) => void;
}

export const useTrackPagination = (filteredSortedTracks: Track[]): UseTrackPaginationResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedTracks = filteredSortedTracks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSortedTracks.length / PAGE_SIZE);

  const handleTrackEnd = (index: number) => {
    const globalIndex = startIndex + index;

    const findNextPlayableIndex = (startIdx: number): number | null => {
      for (let i = startIdx + 1; i < filteredSortedTracks.length; i++) {
        if (filteredSortedTracks[i].audioFile) return i;
      }
      return null;
    };

    const nextPlayableIndex = findNextPlayableIndex(globalIndex);

    if (nextPlayableIndex !== null) {
      const nextPage = Math.floor(nextPlayableIndex / PAGE_SIZE);
      const isOnSamePage = nextPage === currentPage - 1;

      if (!isOnSamePage) {
        setCurrentPage(nextPage + 1);
        setCurrentPlayingIndex(null); // очищаємо індекс перед ререндером

        setTimeout(() => {
          setCurrentPlayingIndex(nextPlayableIndex);
        }, 500);
      } else {
        setCurrentPlayingIndex(nextPlayableIndex);
      }
    } else {
      setCurrentPlayingIndex(null);
    }
  };

  return {
    currentPage,
    setCurrentPage,
    currentPlayingIndex,
    setCurrentPlayingIndex,
    paginatedTracks,
    totalPages,
    startIndex,
    endIndex,
    handleTrackEnd,
  };
};
