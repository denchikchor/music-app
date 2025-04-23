import React from 'react';
import styles from './TrackBulkActions.module.css';

interface Props {
  selectionMode: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleMode: () => void;
  onSelectAll: () => void;
  onBulkDelete: () => void;
}

const TrackBulkActions: React.FC<Props> = ({
  selectionMode,
  selectedCount,
  totalCount,
  onToggleMode,
  onSelectAll,
  onBulkDelete,
}) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onToggleMode} className={styles.button}>
        {selectionMode ? 'Cancel' : 'Bulk select'}
      </button>

      {selectionMode && (
        <div className={styles.controls}>
          <span>
          Selected: {selectedCount} / {totalCount}
          </span>
          <button onClick={onSelectAll} className={styles.button}>
          Select all
          </button>
          <button
            onClick={onBulkDelete}
            disabled={selectedCount === 0}
            className={styles.dangerButton}
          >
            Delete selected
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackBulkActions;
