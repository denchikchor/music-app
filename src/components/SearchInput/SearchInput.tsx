import React, { useEffect, useRef } from 'react';
import styles from './SearchInput.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onChange('');
        inputRef.current?.blur();
      }
    };

    const el = inputRef.current;
    el?.addEventListener('keydown', handleKeyDown);
    return () => el?.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by title, artist, or album"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        data-testid="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;
