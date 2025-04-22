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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;
    onSubmit({ title, artist, album, coverImage, genres });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="track-form">
      <input
        data-testid="input-title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Track name"
      />
      <input
        data-testid="input-artist"
        required
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
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
        <button type="submit" data-testid="submit-button">
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TrackForm;
