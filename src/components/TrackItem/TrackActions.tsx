import React from 'react';
import styles from './TrackItem.module.css';
import { ReactComponent as Dots } from '../../assets/dots.svg';

interface Props {
  onEdit: () => void;
}

const TrackActions: React.FC<Props> = ({ onEdit }) => (
  <div className={styles.mainActions}>
    <button onClick={onEdit} data-testid="edit-track-button">
      <Dots className={styles.dots} />
    </button>
  </div>
);

export default TrackActions;