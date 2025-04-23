import React from 'react';
import styles from './TrackItem.module.css';
import coverImage from '../../assets/default_cover.jpg'

interface Props {
  src?: string;
  alt: string;
}

const TrackCover: React.FC<Props> = ({ src, alt }) => (
  <img
    src={src || coverImage}
    alt={alt}
    onError={(e) => ((e.target as HTMLImageElement).src = coverImage)}
    className={styles.cover}
  />
);

export default TrackCover;