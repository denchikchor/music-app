import React from 'react';
import styles from './ConfirmDialog.module.css';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<Props> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} data-testid="confirm-dialog">
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} data-testid="confirm-delete">Delete</button>
          <button onClick={onCancel} data-testid="cancel-delete">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;