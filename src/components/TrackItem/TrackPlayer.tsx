import React from 'react';
import styles from './TrackItem.module.css';
import CustomAudioPlayer from '../CustomAudioPlayer/CustomAudioPlayer';
import TrackUpload from '../TrackUpload/TrackUpload';
import { API_BASE } from '../../api/config';

interface Props {
  trackId: string;
  audioFile?: string;
  isActive: boolean;
  onTogglePlay: () => void;
  onTrackEnd: () => void;
}

const TrackPlayer: React.FC<Props> = ({
  trackId,
  audioFile,
  isActive,
  onTogglePlay,
  onTrackEnd,
}) => (
  <div className={styles.player}>
    {audioFile && (
      <div className={styles.audioWrapper}>
        <CustomAudioPlayer
          src={`${API_BASE}/files/${audioFile}`}
          isActive={isActive}
          onTogglePlay={onTogglePlay}
          onEndedNext={onTrackEnd}
        />
      </div>
    )}
    <div className={styles.actions}>
      <TrackUpload trackId={trackId} />
    </div>
  </div>
);

export default TrackPlayer;
