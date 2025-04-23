import React, { useState } from 'react';
import TrackForm from '../TrackForm/TrackForm';
import styles from './TrackEditModal.module.css';
import { Track } from '../../features/tracks/types';
import { editTrack } from '../../features/tracks/trackSlice';
import { useAppDispatch } from '../../hooks/redux-hook';
import { toast } from 'react-toastify';
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';
import ToastMessage from '../UI/ToastMessage/ToastMessage';

interface Props {
  track: Track;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const TrackEditModal: React.FC<Props> = ({ track, onClose, onDelete }) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    artist: string;
    album: string;
    coverImage: string;
    genres: string[];
  }) => {
    try {
      await dispatch(editTrack({ id: track.id, ...data }));
      toast.success(<ToastMessage message="Track successfully updated!" type="success" />);
      onClose();
    } catch (error) {
      console.error('Track editing error:', error);
      toast.error(<ToastMessage message="Error while editing track" type="error" />);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(track.id);
      toast.success(<ToastMessage message="Track deleted" type="success" />);
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(<ToastMessage message="Error deleting track" type="error" />);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Edit track</h2>
          <button onClick={() => setShowConfirm(true)} data-testid={`delete-track-${track.id}`} className={styles.deleteButton}>
            Delete track
          </button>
        </div>

        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this track?"
            onConfirm={() => {
              handleDelete();
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
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
