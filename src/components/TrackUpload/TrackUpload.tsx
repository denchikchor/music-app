import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './TrackUpload.module.css';
import { RootState } from '../../store';
import { removeTrackFile, uploadTrackFile } from '../../features/tracks/trackSlice';
import Button from '../UI/Button/Button';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux-hook';
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';
import ToastMessage from '../UI/ToastMessage/ToastMessage';

interface Props {
  trackId: string;
}

const TrackUpload: React.FC<Props> = ({ trackId }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const track = useSelector((state: RootState) => state.tracks.items.find((t) => t.id === trackId));

  if (!track) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Allowed: MP3, WAV.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('The file is too large. Maximum 10 MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await dispatch(uploadTrackFile({ id: trackId, file: formData }));
      toast.success(<ToastMessage message="File successfully uploaded!" type="success" />)
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(<ToastMessage message="Error while uploading file" type="error" />)
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      await dispatch(removeTrackFile(trackId));
      toast.success('File deleted');
    } catch (err) {
      console.error('Error deleting file:', err);
      toast.error('Error deleting track');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="file"
        accept="audio/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          data-loading={uploading}
          aria-disabled={uploading}
          data-testid={`upload-track-${trackId}`}
        >
          {uploading ? 'Loading...' : 'Upload the audio file'}
        </Button>
      {track.audioFile && (
        <Button
          variant="danger"
          size="sm"
          onClick={() => setShowConfirm(true)}
          data-testid={`remove-track-file-${track.id}`}
        >
          Delete the audio file
        </Button>
        
      )}
      {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this track?"
            onConfirm={() => {
              handleRemove();
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
    </div>
  );
};

export default TrackUpload;
