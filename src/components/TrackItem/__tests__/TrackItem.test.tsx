import { render, screen, fireEvent } from '@testing-library/react';
import TrackItem from '../TrackItem';
import type { Track } from '../../../features/tracks/types';

const mockTrack: Track = {
  id: 'track-123',
  title: 'Test Title',
  artist: 'Test Artist',
  album: 'Test Album',
  genres: ['Rock'],
  coverImage: 'cover.jpg',
  audioFile: 'track.mp3',
  slug: 'test-title',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TrackItem', () => {
  const baseProps = {
    track: mockTrack,
    isActive: false,
    onEdit: vi.fn(),
    onTogglePlay: vi.fn(),
    onTrackEnd: vi.fn(),
    selectionMode: true,
    selected: false,
    onToggleSelect: vi.fn(),
  };

  it('renders track data correctly', () => {
    render(<TrackItem {...baseProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

  it('renders track player when audioFile is provided', () => {
    render(<TrackItem {...baseProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onEdit with correct track when edit button is clicked', () => {
    render(<TrackItem {...baseProps} />);
    const editButton = screen.getByTestId(`edit-track-${mockTrack.id}`);
    fireEvent.click(editButton);
    expect(baseProps.onEdit).toHaveBeenCalledWith(mockTrack);
  });

  it('renders and toggles checkbox if selectionMode is true', () => {
    render(<TrackItem {...baseProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(baseProps.onToggleSelect).toHaveBeenCalled();
  });
});
