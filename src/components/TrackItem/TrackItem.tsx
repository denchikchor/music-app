import React from 'react';
import styles from './TrackItem.module.css';
import { Track } from '../../features/tracks/types';
import TrackCover from './TrackCover';
import TrackInfo from './TrackInfo';
import TrackPlayer from './TrackPlayer';
import TrackActions from './TrackActions';

interface Props {
  track: Track;
  isActive: boolean;
  onEdit: (track: Track) => void;
  onTogglePlay: () => void;
  onTrackEnd: () => void;
}

const TrackItemView: React.FC<Props> = ({ track, isActive, onEdit, onTogglePlay, onTrackEnd }) => {
  return (
    <li className={styles.trackItem} data-testid={`track-item-${track.id}`}>
      <div className={styles.trackInfo}>
        <TrackCover src={track.coverImage} alt={track.title} />
        <TrackInfo title={track.title} artist={track.artist} album={track.album} genres={track.genres} id={track.id} />
      </div>
      <TrackPlayer trackId={track.id} audioFile={track.audioFile} isActive={isActive} onTogglePlay={onTogglePlay} onTrackEnd={onTrackEnd} />
      <TrackActions onEdit={() => onEdit(track)} />
    </li>
  );
};

export default TrackItemView;