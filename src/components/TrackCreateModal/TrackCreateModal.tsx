import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TrackForm from '../TrackForm/TrackForm';
import { createTrack } from '../../features/tracks/trackSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux-hook';
import ToastMessage from '../UI/ToastMessage/ToastMessage';
import ModalWrapper from '../UI/ModalWrapper/ModalWrapper';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const TrackCreateModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const dispatch = useAppDispatch();
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
      onCreated();
      onClose();
      toast.success(<ToastMessage message="Track successfully added!" type="success" />);
    } catch (error) {
      console.error('Error creating track:', error);
      toast.error(<ToastMessage message="Failed to create track" type="error" />);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 data-testid="tracks-header">Create a new track</h2>
      <TrackForm submitLabel="Create" onSubmit={handleSubmit} onCancel={onClose} />
    </ModalWrapper>
  );
};

export default TrackCreateModal;
