import React, { useState } from 'react';
import styles from './TrackBulkActions.module.css';
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import ToastMessage from '../UI/ToastMessage/ToastMessage';

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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await onBulkDelete(); // якщо це async
      toast.success(<ToastMessage message="Tracks deleted successfully" type="success" />);
    } catch (err) {
      console.error('Failed to delete tracks', err);
      toast.error(<ToastMessage message="Failed to delete tracks" type="error" />);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={onToggleMode} className={styles.button} data-testid="toggle-selection-mode">
        {selectionMode ? 'Cancel' : 'Bulk select'}
      </button>

      {selectionMode && (
        <div className={styles.controls}>
          <span data-testid="selection-count">
            Selected: {selectedCount} / {totalCount}
          </span>
          <button onClick={onSelectAll} className={styles.button} data-testid="select-all">
            Select all
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={selectedCount === 0}
            data-loading={selectedCount === 0}
            aria-disabled={selectedCount === 0}
            data-testid="delete-selected"
            className={styles.dangerButton}
          >
            Delete selected
          </button>

          {showConfirm && (
            <ConfirmDialog
              message="Are you sure you want to delete these tracks?"
              onConfirm={handleConfirmDelete}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TrackBulkActions;
