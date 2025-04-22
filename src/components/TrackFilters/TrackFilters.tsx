import React from 'react';
import styles from './TrackFilters.module.css';

interface Props {
  artists: string[];
  genres: string[];
  selectedArtist: string;
  selectedGenre: string;
  onArtistChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

const TrackFilters: React.FC<Props> = ({
  artists,
  genres,
  selectedArtist,
  selectedGenre,
  onArtistChange,
  onGenreChange,
}) => {
  return (
    <div className={styles.filtersWrapper}>
      <select
        value={selectedArtist}
        onChange={(e) => onArtistChange(e.target.value)}
        className={styles.select}
        data-testid="filter-artist"
      >
        <option value="">All artists</option>
        {artists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className={styles.select}
        data-testid="filter-genre"
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackFilters;
