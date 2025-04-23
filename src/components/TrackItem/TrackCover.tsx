import React from 'react';
import styles from './TrackItem.module.css';

interface Props {
  src?: string;
  alt: string;
}

const TrackCover: React.FC<Props> = ({ src, alt }) => (
  <img
    src={src || '/logo192.png'}
    alt={alt}
    onError={(e) => ((e.target as HTMLImageElement).src = '/logo192.png')}
    className={styles.cover}
  />
);

export default TrackCover;