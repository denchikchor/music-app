import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './TrackUpload.module.css';
import { RootState } from '../../store';
import { removeTrackFile, uploadTrackFile } from '../../features/tracks/trackSlice';
import Button from '../UI/Button/Button';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux-hook';

interface Props {
  trackId: string;
}

const TrackUpload: React.FC<Props> = ({ trackId }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

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
      toast.success('File successfully uploaded!');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Error while uploading file');
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    const confirmed = window.confirm('Delete audio file from track?');
    if (!confirmed) return;

    setUploading(true);
    try {
      await dispatch(removeTrackFile(trackId));
    } catch (err) {
      console.error('Error deleting file:', err);
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
        data-testid={`upload-track-${trackId}`}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Loading...' : 'Upload the audio file'}
      </Button>
      {track.audioFile && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemove}
          data-testid={`remove-track-file-${track.id}`}
        >
          Delete the audio file
        </Button>
      )}
    </div>
  );
};

export default TrackUpload;
