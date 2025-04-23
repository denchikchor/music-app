import React, { useState } from 'react';
import styles from './TrackForm.module.css';
import GenreSelector from '../genres/GenreSelector';

interface TrackFormData {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage: string;
}

interface Props {
  initialValues?: Partial<TrackFormData>;
  onSubmit: (data: TrackFormData) => void;
  onCancel: () => void;
  submitLabel: string;
}

const TrackForm: React.FC<Props> = ({ initialValues = {}, onSubmit, onCancel, submitLabel }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [artist, setArtist] = useState(initialValues.artist || '');
  const [album, setAlbum] = useState(initialValues.album || '');
  const [coverImage, setCoverImage] = useState(initialValues.coverImage || '');
  const [genres, setGenres] = useState<string[]>(initialValues.genres || []);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    artist?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Track name is required';
    if (!artist.trim()) newErrors.artist = 'Artist is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ title, artist, album, coverImage, genres });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="track-form">
      <div className={styles.fieldGroup}>
      <input
        data-testid="input-title"
        
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Track name"
      />
      {errors.title && <div className={styles.error} data-testid="error-title">{errors.title}</div>}
      </div>
      <div className={styles.fieldGroup}>
      <input
        data-testid="input-artist"
        
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      {errors.artist && <div className={styles.error} data-testid="error-artist">{errors.artist}</div>}
      </div>
      
      <input
        data-testid="input-album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="Album"
      />
      <GenreSelector selected={genres} onChange={setGenres} />
      <input
        data-testid="input-cover-image"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        placeholder="Cover (URL)"
      />

      <div className={styles.actions}>
        <button
          type="submit"
          data-testid="submit-button"
          disabled={submitting}
          data-loading={submitting}
          aria-disabled={submitting}
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} data-testid="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TrackForm;
