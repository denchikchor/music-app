// src/hooks/__tests__/useTrackFiltering.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTrackFiltering } from '../useTrackFiltering';
import type { Track } from '../../features/tracks/types';

const tracks: Track[] = [
  {
    id: '1',
    title: 'Hello World',
    artist: 'Alice',
    album: 'First',
    genres: ['Pop'],
    coverImage: '',
    audioFile: '',
    slug: '',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    title: 'Goodbye',
    artist: 'Bob',
    album: 'Second',
    genres: ['Rock'],
    coverImage: '',
    audioFile: '',
    slug: '',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '3',
    title: 'World Tour',
    artist: 'Carol',
    album: 'Third',
    genres: ['Jazz'],
    coverImage: '',
    audioFile: '',
    slug: '',
    createdAt: '',
    updatedAt: '',
  },
];

// Test component that renders the IDs of filtered tracks
type TestComponentProps = {
  search: string;
  selectedArtist: string;
  selectedGenre: string;
  sortBy: '' | 'title' | 'artist' | 'genre';
  sortDirection: 'asc' | 'desc';
};

function TestComponent({
  search,
  selectedArtist,
  selectedGenre,
  sortBy,
  sortDirection,
}: TestComponentProps) {
  const { filteredSortedTracks } = useTrackFiltering(
    tracks,
    search,
    selectedArtist,
    selectedGenre,
    sortBy,
    sortDirection
  );

  return (
    <ul data-testid="list">
      {filteredSortedTracks.map((t) => (
        <li key={t.id} data-testid="item">
          {t.id}
        </li>
      ))}
    </ul>
  );
}

describe('useTrackFiltering via TestComponent', () => {
  const defaults = {
    search: '',
    selectedArtist: '',
    selectedGenre: '',
    sortBy: '' as const,
    sortDirection: 'asc' as const,
  };

  it('returns all tracks when filter is empty', () => {
    render(<TestComponent {...defaults} />);
    expect(screen.getAllByTestId('item')).toHaveLength(3);
  });

  it('filters by part of title', () => {
    render(<TestComponent {...defaults} search="world" />);
    const ids = screen.getAllByTestId('item').map((el) => el.textContent);
    expect(ids.sort()).toEqual(['1', '3']);
  });

  it('ignores case when filtering', () => {
    render(<TestComponent {...defaults} search="HeLlO" />);
    const ids = screen.getAllByTestId('item').map((el) => el.textContent);
    expect(ids).toEqual(['1']);
  });

  it('returns empty array when no matches found', () => {
    render(<TestComponent {...defaults} search="xyz" />);
    expect(screen.queryAllByTestId('item')).toHaveLength(0);
  });
});
