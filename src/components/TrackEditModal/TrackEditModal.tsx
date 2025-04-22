import React from 'react';
import TrackForm from '../TrackForm/TrackForm';
import styles from './TrackEditModal.module.css';
import { Track } from '../../features/tracks/types';
import { editTrack } from '../../features/tracks/trackSlice';
import { useAppDispatch } from '../../hooks/redux-hook';

interface Props {
  track: Track;
  onClose: () => void;
}

const TrackEditModal: React.FC<Props> = ({ track, onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: {
    title: string;
    artist: string;
    album: string;
    coverImage: string;
    genres: string[];
  }) => {
    try {
      await dispatch(editTrack({ id: track.id, ...data }));
      onClose();
    } catch (error) {
      console.error('Track editing error:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit track</h2>
        <TrackForm
          initialValues={{
            title: track.title,
            artist: track.artist,
            album: track.album,
            genres: track.genres,
            coverImage: track.coverImage || '',
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel="Save"
        />
      </div>
    </div>
  );
};

export default TrackEditModal;
