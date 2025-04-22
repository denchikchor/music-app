import React from 'react';
import styles from './SortSelect.module.css';

interface Props {
  value: '' | 'title' | 'artist' | 'genre';
  direction: 'asc' | 'desc';
  onChange: (value: 'title' | 'artist' | 'genre' | '') => void;
  onToggleDirection: () => void;
}

const SortSelect: React.FC<Props> = ({ value, direction, onChange, onToggleDirection }) => {
  return (
    <div className={styles.sortWrapper}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Props['value'])}
        className={styles.select}
        data-testid="sort-select"
      >
        <option value="">Sorting</option>
        <option value="title">Name</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
      </select>

      <button onClick={onToggleDirection} className={styles.toggleButton}>
        {direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SortSelect;
