import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../store';
import { fetchGenres } from '../../features/genres/genresSlice';
import styles from './GenreSelector.module.css';
import { useAppDispatch } from '../../hooks/redux-hook';

interface Props {
  selected: string[];
  onChange: (genres: string[]) => void;
}

const GenreSelector: React.FC<Props> = ({ selected, onChange }) => {
  const dispatch = useAppDispatch();
  const genres = useSelector((state: RootState) => state.genres.items);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const availableGenres = genres.filter((g) => !selected.includes(g));

  return (
    <div className={styles.genreSelector} data-testid="genre-selector">
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
        <div className={styles.customSelectWrapper}>
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
          <svg className={styles.arrow} viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
            <polyline points="1,1 6,6 11,1" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
