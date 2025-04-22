import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../../store';
import { fetchGenres } from '../../features/genres/genresSlice';
import styles from './GenreSelector.module.css';

interface Props {
  selected: string[];
  onChange: (genres: string[]) => void;
}

const GenreSelector: React.FC<Props> = ({ selected, onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector((state: RootState) => state.genres.items);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const availableGenres = genres.filter((g) => !selected.includes(g));

  return (
    <div className={styles.genreSelector}>
      <div className={styles.selectedGenres}>
        {selected.map((genre) => (
          <span key={genre} className={styles.tag}>
            {genre}
            <button
              className={styles.removeButton}
              onClick={() => onChange(selected.filter((g) => g !== genre))}
              aria-label={`Remove genre ${genre}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {availableGenres.length > 0 && (
        <select
          className={styles.select}
          onChange={(e) => {
            const value = e.target.value;
            if (value && !selected.includes(value)) {
              onChange([...selected, value]);
            }
          }}
          value=""
        >
          <option value="">+ Add genre</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GenreSelector;
