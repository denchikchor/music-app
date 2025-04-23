import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.module.css';
import { Track } from '../../features/tracks/types';

interface Props {
  tracks: Track[];
  startIndex: number;
  currentPlayingIndex: number | null;
  setCurrentPlayingIndex: (index: number | null) => void;
  onEditTrack: (track: Track) => void;
  onDeleteTrack: (id: string) => void;
  onTrackEnd: (index: number) => void;
  selectionMode: boolean;
  selectedTracks: string[];
  toggleTrackSelection: (id: string) => void;
}

const TrackListContent: React.FC<Props> = ({
  tracks,
  startIndex,
  currentPlayingIndex,
  setCurrentPlayingIndex,
  onEditTrack,
  onDeleteTrack,
  onTrackEnd,
  selectionMode,
  selectedTracks,
  toggleTrackSelection,
}) => {
  if (tracks.length === 0) {
    return <p className={styles.noResults}>Nothing found</p>;
  }

  return (
    <ul className={`${styles.list} ${styles.fadeIn}`}>
      {tracks.map((track, index) => {
        const globalIndex = startIndex + index;
        return (
          <TrackItem
            key={track.id}
            track={track}
            isActive={currentPlayingIndex === globalIndex}
            onEdit={onEditTrack}
            onTogglePlay={() =>
              setCurrentPlayingIndex(currentPlayingIndex === globalIndex ? null : globalIndex)
            }
            onTrackEnd={() => onTrackEnd(index)}
            selectionMode={selectionMode}
            selected={selectedTracks.includes(track.id)}
            onToggleSelect={() => toggleTrackSelection(track.id)}
          />
        );
      })}
    </ul>
  );
};

export default TrackListContent;
