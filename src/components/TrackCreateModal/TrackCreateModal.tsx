import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import TrackForm from '../TrackForm/TrackForm';
import styles from './TrackCreateModal.module.css';
import { createTrack } from '../../features/tracks/trackSlice';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

const TrackCreateModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tracks = useSelector((state: RootState) => state.tracks.items);

  const handleSubmit = async (data: {
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage: string;
  }) => {
    const titleLower = data.title.trim().toLowerCase();

    const isDuplicate = tracks.some((t) => t.title.trim().toLowerCase() === titleLower);

    if (isDuplicate) {
      toast.error('A track with that name already exists!');
      return;
    }

    try {
      await dispatch(createTrack(data));
      onClose(); 
    } catch (error) {
      console.error('Error creating track:', error);
      toast.error('❌ Failed to create track');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 data-testid="tracks-header">Create a new track</h2>
        <TrackForm submitLabel="Create" onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default TrackCreateModal;
