import React from 'react';
import styles from './TrackItem.module.css';

import TrackUpload from '../TrackUpload/TrackUpload';
import { Track } from '../../features/tracks/types';
import CustomAudioPlayer from '../CustomAudioPlayer/CustomAudioPlayer';
import { ReactComponent as Dots } from '../../assets/dots.svg';
import { ReactComponent as Bin } from '../../assets/bin.svg';
import { API_BASE } from '../../api/api';

interface Props {
  track: Track;
  onEdit: (track: Track) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
  onTogglePlay: () => void;
  onTrackEnd: () => void;
}

const TrackItem: React.FC<Props> = ({
  track,
  onEdit,
  onDelete,
  isActive,
  onTogglePlay,
  onTrackEnd,
}) => {
  return (
    <li className={styles.trackItem} data-testid={`track-item-${track.id}`}>
      <div className={styles.trackInfo}>
        <img
          src={track.coverImage || '/logo192.png'}
          alt={track.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/logo192.png';
          }}
          className={styles.cover}
        />

        <div className={styles.info}>
          <div className={styles.title} data-testid={`track-item-${track.id}-title`}>
            {track.title}
          </div>
          <div className={styles.artist} data-testid={`track-item-${track.id}-artist`}>
            {track.artist}
          </div>
          <div className={styles.album}>{track.album}</div>

          <div className={styles.genres}>
            {track.genres.map((g) => (
              <span key={g} className={styles.genre}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.player}>
        {track.audioFile && (
          <div className={styles.audioWrapper}>
            <CustomAudioPlayer
              src={`${API_BASE}/files/${track.audioFile}`}
              isActive={isActive}
              onTogglePlay={onTogglePlay}
              onEndedNext={onTrackEnd}
            />
          </div>
        )}

        <div className={styles.actions}>
          <TrackUpload trackId={track.id} />
        </div>
      </div>

      <div className={styles.mainActions}>
        <button onClick={() => onEdit(track)} data-testid={`edit-track-${track.id}`}>
          <Dots className={styles.dots} />
        </button>
        <button onClick={() => onDelete(track.id)} data-testid={`delete-track-${track.id}`}>
          <Bin className={styles.bin} />
        </button>
      </div>
    </li>
  );
};

export default TrackItem;
