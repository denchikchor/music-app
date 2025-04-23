import React from 'react';
import SortSelect from '../SortSelect/SortSelect';
import TrackFilters from '../TrackFilters/TrackFilters';
import styles from './TrackList.module.css';

interface Props {
  sortBy: '' | 'title' | 'artist' | 'genre';
  sortDirection: 'asc' | 'desc';
  setSortBy: React.Dispatch<React.SetStateAction<'' | 'title' | 'artist' | 'genre'>>;
  setSortDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  selectedArtist: string;
  selectedGenre: string;
  setSelectedArtist: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  artists: string[];
  genres: string[];
}

const TrackListControls: React.FC<Props> = ({
  sortBy,
  sortDirection,
  setSortBy,
  setSortDirection,
  selectedArtist,
  selectedGenre,
  setSelectedArtist,
  setSelectedGenre,
  artists,
  genres,
}) => {
  return (
    <div className={styles.controls}>
      <SortSelect
        value={sortBy}
        onChange={setSortBy}
        direction={sortDirection}
        onToggleDirection={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
      />
      <TrackFilters
        artists={artists}
        genres={genres}
        selectedArtist={selectedArtist}
        selectedGenre={selectedGenre}
        onArtistChange={setSelectedArtist}
        onGenreChange={setSelectedGenre}
      />
    </div>
  );
};

export default TrackListControls;
