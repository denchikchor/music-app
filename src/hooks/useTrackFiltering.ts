import { useMemo } from 'react';
import type { Track } from '../features/tracks/types';

export interface UseTrackFilteringResult {
  filteredSortedTracks: Track[];
  uniqueArtists: string[];
  uniqueGenres: string[];
}

export const useTrackFiltering = (
  tracks: Track[],
  search: string,
  selectedArtist: string,
  selectedGenre: string,
  sortBy: '' | 'title' | 'artist' | 'genre',
  sortDirection: 'asc' | 'desc'
): UseTrackFilteringResult => {
  const uniqueArtists = useMemo(() => {
    return Array.from(new Set(tracks.map((t) => t.artist)));
  }, [tracks]);

  const uniqueGenres = useMemo(() => {
    return Array.from(new Set(tracks.flatMap((t) => t.genres)));
  }, [tracks]);

  const filteredSortedTracks = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return [...tracks]
      .filter((track) => {
        const includes = (value: string | undefined) =>
          value?.toLowerCase().includes(lowerSearch) ?? false;

        const matchesSearch =
          includes(track.title) || includes(track.artist) || includes(track.album);
        const artistMatch = selectedArtist ? track.artist === selectedArtist : true;
        const genreMatch = selectedGenre ? track.genres.includes(selectedGenre) : true;

        return matchesSearch && artistMatch && genreMatch;
      })
      .sort((a, b) => {
        if (!sortBy) return 0;

        const aValue = sortBy === 'genre' ? a.genres[0] || '' : a[sortBy];
        const bValue = sortBy === 'genre' ? b.genres[0] || '' : b[sortBy];
        const result = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? result : -result;
      });
  }, [tracks, search, selectedArtist, selectedGenre, sortBy, sortDirection]);

  return {
    filteredSortedTracks,
    uniqueArtists,
    uniqueGenres,
  };
};
