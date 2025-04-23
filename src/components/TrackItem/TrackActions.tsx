import React from 'react';
import styles from './TrackItem.module.css';
import { ReactComponent as Dots } from '../../assets/dots.svg';

interface Props {
  onEdit: () => void;
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: () => void;
  trackId: string;
}

const TrackActions: React.FC<Props> = ({ onEdit, showCheckbox, checked, onCheckboxChange, trackId }) => (
  <div className={styles.mainActions}>
    <button onClick={onEdit} data-testid={`edit-track-${trackId}`}>
      <Dots className={styles.dots} />
    </button>
    {showCheckbox && (
  <div className={styles.checkboxWrapper}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onCheckboxChange}
      className={styles.checkbox}
    />
  </div>
)}
  </div>
);

export default TrackActions;