import React from 'react';
import styles from './TrackItem.module.css';

interface Props {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  id: string;
}

const TrackInfo: React.FC<Props> = ({ title, artist, album, genres, id }) => (
  <div className={styles.info}>
    <div className={styles.title} data-testid={`track-item-${id}-title`}>
      {title}
    </div>
    <div className={styles.artist} data-testid={`track-item-${id}-artist`}>
      {artist}
    </div>
    <div className={styles.album}>{album}</div>
    <div className={styles.genres}>
      {genres.map((g) => (
        <span key={g} className={styles.genre}>
          {g}
        </span>
      ))}
    </div>
  </div>
);

export default TrackInfo;
