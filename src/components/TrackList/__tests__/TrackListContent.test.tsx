import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrackListContent from '../TrackListContent';
import type { Track } from '../../../features/tracks/types';

// ✅ МОК TrackItem за шляхом ../../TrackItem/TrackItem
vi.mock('../../TrackItem/TrackItem', () => ({
  __esModule: true,
  default: ({ track, isActive, onToggleSelect }: any) => (
    <li
      data-testid="track-item"
      data-trackid={track.id}
      data-active={isActive ? 'true' : 'false'}
      onClick={() => onToggleSelect(track.id)}
    >
      {track.title}
    </li>
  ),
}));

describe('TrackListContent', () => {
  const tracks: Track[] = [
    {
      id: 't1',
      title: 'Track 1',
      artist: '',
      album: '',
      genres: [],
      coverImage: '',
      audioFile: '',
      slug: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 't2',
      title: 'Track 2',
      artist: '',
      album: '',
      genres: [],
      coverImage: '',
      audioFile: '',
      slug: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 't3',
      title: 'Track 3',
      artist: '',
      album: '',
      genres: [],
      coverImage: '',
      audioFile: '',
      slug: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  const baseProps = {
    startIndex: 0,
    currentPlayingIndex: null as number | null,
    setCurrentPlayingIndex: () => {},
    onEditTrack: () => {},
    onDeleteTrack: () => {},
    onTrackEnd: () => {},
    selectionMode: true,
    selectedTracks: [] as string[],
    toggleTrackSelection: vi.fn(),
  };

  it('renders all tracks', () => {
    render(<TrackListContent tracks={tracks} {...baseProps} />);
    const items = screen.getAllByTestId('track-item');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveAttribute('data-trackid', 't1');
  });

  it('marks the correct track as active', () => {
    render(<TrackListContent tracks={tracks} {...baseProps} currentPlayingIndex={1} />);
    const items = screen.getAllByTestId('track-item');
    expect(items[1]).toHaveAttribute('data-active', 'true');
    expect(items[0]).toHaveAttribute('data-active', 'false');
  });

  it('calls toggleTrackSelection when clicked', () => {
    const mockToggle = vi.fn();
    render(<TrackListContent tracks={tracks} {...baseProps} toggleTrackSelection={mockToggle} />);
    const items = screen.getAllByTestId('track-item');
    fireEvent.click(items[2]);
    expect(mockToggle).toHaveBeenCalledWith('t3');
  });

  it('shows placeholder text when no tracks', () => {
    render(<TrackListContent tracks={[]} {...baseProps} />);
    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});
