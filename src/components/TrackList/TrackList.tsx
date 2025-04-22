import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.module.css';
import { AppDispatch, RootState } from '../../store';
import { deleteTrack, fetchTracks } from '../../features/tracks/trackSlice';
import { Track } from '../../features/tracks/types';
import SortSelect from '../SortSelect/SortSelect';
import TrackFilters from '../TrackFilters/TrackFilters';
import { useDebounce } from '../../hooks/useDebounce';
import Pagination from '../Pagination/Pagination';

interface Props {
  onEditTrack: (track: Track) => void;
  searchQuery: string;
}

const TrackList: React.FC<Props> = ({ onEditTrack, searchQuery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tracks = useSelector((state: RootState) => state.tracks.items);
  const status = useSelector((state: RootState) => state.tracks.status);

  const [sortBy, setSortBy] = useState<'' | 'title' | 'artist' | 'genre'>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);

  const uniqueArtists = Array.from(new Set(tracks.map((t) => t.artist)));
  const uniqueGenres = Array.from(new Set(tracks.flatMap((t) => t.genres)));

  const filteredSortedTracks = [...tracks]
    .filter((track) => {
      const includes = (value: string | undefined) =>
        value?.toLowerCase().includes(debouncedSearch.toLowerCase()) ?? false;

      const matchesSearch =
        includes(track.title) || includes(track.artist) || includes(track.album);
      const artistMatch = selectedArtist ? track.artist === selectedArtist : true;
      const genreMatch = selectedGenre ? track.genres.includes(selectedGenre) : true;

      return matchesSearch && artistMatch && genreMatch;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = sortBy === 'genre' ? a.genres[0] || '' : a[sortBy];
      const bValue = sortBy === 'genre' ? b.genres[0] || '' : b[sortBy];
      const result = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? result : -result;
    });

  const totalPages = Math.ceil(filteredSortedTracks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTracks = filteredSortedTracks.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    dispatch(deleteTrack(id));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedArtist, selectedGenre, sortBy, sortDirection]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const handleTrackEnd = (index: number) => {
    const globalIndex = startIndex + index;
    const nextGlobalIndex = globalIndex + 1;
    if (nextGlobalIndex < filteredSortedTracks.length) {
      const nextPage = Math.floor(nextGlobalIndex / pageSize);
      const newPageIndex = nextGlobalIndex % pageSize;
      if (nextPage + 1 !== currentPage) {
        setCurrentPage(nextPage + 1);
      }
      setCurrentPlayingIndex(nextGlobalIndex);
    } else {
      setCurrentPlayingIndex(null);
    }
  };

  return (
    <div className={styles.trackList}>
      <div className={styles.controls}>
        <SortSelect
          value={sortBy}
          onChange={setSortBy}
          direction={sortDirection}
          onToggleDirection={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        />
        <TrackFilters
          artists={uniqueArtists}
          genres={uniqueGenres}
          selectedArtist={selectedArtist}
          selectedGenre={selectedGenre}
          onArtistChange={setSelectedArtist}
          onGenreChange={setSelectedGenre}
        />
      </div>

      <ul className={`${styles.list} ${styles.fadeIn}`}>
        {paginatedTracks.length === 0 ? (
          <p className={styles.noResults}>Nothing found</p>
        ) : (
          paginatedTracks.map((track, index) => {
            const globalIndex = startIndex + index;
            return (
              <TrackItem
                key={track.id}
                track={track}
                onEdit={onEditTrack}
                onDelete={handleDelete}
                isActive={currentPlayingIndex === globalIndex}
                onTogglePlay={() => {
                  if (currentPlayingIndex === globalIndex) {
                    setCurrentPlayingIndex(null);
                  } else {
                    setCurrentPlayingIndex(globalIndex);
                  }
                }}
                onTrackEnd={() => handleTrackEnd(index)}
              />
            );
          })
        )}
      </ul>

      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default TrackList;
