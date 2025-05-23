import React, { useEffect, useState } from 'react';

import styles from './TrackList.module.css';
import { deleteTrack, fetchTracks } from '../../features/tracks/trackSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/redux-hook';
import { useTrackFiltering } from '../../hooks/useTrackFiltering';
import { useTrackPagination } from '../../hooks/useTrackPagination';
import Preloader from '../Preloader/Preloader';
import TrackListControls from './TrackListControls';
import TrackListContent from './TrackListContent';
import TrackListPagination from './TrackListPagination';
import { Track } from '../../features/tracks/types';
import { useTracks } from '../../hooks/useTracks';
import { useTrackSelection } from '../../hooks/useTrackSelection';
import TrackBulkActions from '../TrackBulkActions/TrackBulkActions';
import { PAGE_SIZE } from '../../constants/pagination';

interface Props {
  onEditTrack: (track: Track) => void;
  searchQuery: string;
  forceGoToFirstPage: boolean;
  setForceGoToFirstPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrackList: React.FC<Props> = ({
  onEditTrack,
  searchQuery,
  forceGoToFirstPage,
  setForceGoToFirstPage,
}) => {
  const dispatch = useAppDispatch();
  const { tracks, status } = useTracks();

  const [sortBy, setSortBy] = useState<'' | 'title' | 'artist' | 'genre'>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { filteredSortedTracks, uniqueArtists, uniqueGenres } = useTrackFiltering(
    tracks,
    debouncedSearch,
    selectedArtist,
    selectedGenre,
    sortBy,
    sortDirection
  );

  const {
    currentPage,
    totalPages,
    paginatedTracks,
    currentPlayingIndex,
    setCurrentPage,
    setCurrentPlayingIndex,
    handleTrackEnd,
  } = useTrackPagination(filteredSortedTracks);

  const {
    selectionMode,
    selectedTracks,
    toggleSelectionMode,
    toggleTrackSelection,
    handleSelectAll,
    handleBulkDelete,
  } = useTrackSelection();

  const handleDelete = (id: string) => {
    dispatch(deleteTrack(id));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (forceGoToFirstPage) {
      setCurrentPage(1);
      window.scrollTo({ top: 0 });
      setForceGoToFirstPage(false);
    }
    // eslint-disable-next-line
  }, [forceGoToFirstPage]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  if (status === 'loading') {
    return (
      <div data-testid="loading-tracks" data-loading="true">
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.trackList}>
      <TrackListControls
        sortBy={sortBy}
        sortDirection={sortDirection}
        setSortBy={setSortBy}
        setSortDirection={setSortDirection}
        selectedArtist={selectedArtist}
        selectedGenre={selectedGenre}
        setSelectedArtist={setSelectedArtist}
        setSelectedGenre={setSelectedGenre}
        artists={uniqueArtists}
        genres={uniqueGenres}
        setCurrentPage={setCurrentPage}
      />

      <TrackBulkActions
        selectionMode={selectionMode}
        selectedCount={selectedTracks.length}
        totalCount={paginatedTracks.length}
        onToggleMode={toggleSelectionMode}
        onSelectAll={() => handleSelectAll(paginatedTracks.map((t) => t.id))}
        onBulkDelete={() =>
          handleBulkDelete(currentPage, filteredSortedTracks.length, setCurrentPage)
        }
      />

      <TrackListContent
        tracks={paginatedTracks}
        startIndex={(currentPage - 1) * PAGE_SIZE}
        currentPlayingIndex={currentPlayingIndex}
        setCurrentPlayingIndex={setCurrentPlayingIndex}
        onEditTrack={onEditTrack}
        onDeleteTrack={handleDelete}
        onTrackEnd={handleTrackEnd}
        selectionMode={selectionMode}
        selectedTracks={selectedTracks}
        toggleTrackSelection={toggleTrackSelection}
      />

      <TrackListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TrackList;
