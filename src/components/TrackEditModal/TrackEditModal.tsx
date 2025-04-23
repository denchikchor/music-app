import React from 'react';
import TrackForm from '../TrackForm/TrackForm';
import styles from './TrackEditModal.module.css';
import { Track } from '../../features/tracks/types';
import { editTrack } from '../../features/tracks/trackSlice';
import { useAppDispatch } from '../../hooks/redux-hook';
import { toast } from 'react-toastify';

interface Props {
  track: Track;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const TrackEditModal: React.FC<Props> = ({ track, onClose, onDelete }) => {
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
      toast.success('Track successfully updated!');
      onClose();
    } catch (error) {
      console.error('Track editing error:', error);
      toast.error('Error while editing track');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(track.id);
      toast.success('Track deleted');
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Error deleting track');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Edit track</h2>
          <button onClick={handleDelete} data-testid={`delete-track-${track.id}`} className={styles.deleteButton}>
            Delete track
          </button>
        </div>

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
