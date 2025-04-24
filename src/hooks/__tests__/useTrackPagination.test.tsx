import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useTrackPagination } from '../useTrackPagination';
import type { Track } from '../../features/tracks/types';

function PaginationTest({ tracks }: { tracks: Track[] }) {
  const { currentPage, setCurrentPage, paginatedTracks, totalPages, startIndex, endIndex } =
    useTrackPagination(tracks);

  return (
    <div>
      <span data-testid="currentPage">{currentPage}</span>
      <span data-testid="totalPages">{totalPages}</span>
      <span data-testid="startIndex">{startIndex}</span>
      <span data-testid="endIndex">{endIndex}</span>
      <ul data-testid="list">
        {paginatedTracks.map((t) => (
          <li key={t.id} data-testid="item">
            {t.id}
          </li>
        ))}
      </ul>
      <button data-testid="gotoPage2" onClick={() => setCurrentPage(2)}>
        Go Page 2
      </button>
    </div>
  );
}

const createTracks = (n: number): Track[] =>
  Array.from({ length: n }, (_, idx) => ({
    id: `${idx + 1}`,
    title: `Title ${idx + 1}`,
    artist: 'Artist',
    album: 'Album',
    genres: [],
    coverImage: '',
    audioFile: 'audio.mp3',
    slug: '',
    createdAt: '',
    updatedAt: '',
  }));

describe('useTrackPagination via PaginationTest', () => {
  it('handles small list less than PAGE_SIZE', () => {
    const tracks = createTracks(3);
    render(<PaginationTest tracks={tracks} />);
    expect(screen.getByTestId('currentPage').textContent).toBe('1');
    expect(screen.getByTestId('totalPages').textContent).toBe('1');
    expect(screen.getAllByTestId('item')).toHaveLength(3);
    expect(screen.getByTestId('startIndex').textContent).toBe('0');
    expect(screen.getByTestId('endIndex').textContent).toBe('10');
  });

  it('paginates correctly when list exceeds PAGE_SIZE', () => {
    const tracks = createTracks(12);
    render(<PaginationTest tracks={tracks} />);
    expect(screen.getByTestId('totalPages').textContent).toBe('2');
    expect(screen.getAllByTestId('item')).toHaveLength(10);
    expect(screen.getByTestId('startIndex').textContent).toBe('0');
    expect(screen.getByTestId('endIndex').textContent).toBe('10');
  });

  it('updates page and slice when setCurrentPage is called', () => {
    const tracks = createTracks(12);
    render(<PaginationTest tracks={tracks} />);
    fireEvent.click(screen.getByTestId('gotoPage2'));
    expect(screen.getByTestId('currentPage').textContent).toBe('2');
    expect(screen.getAllByTestId('item')).toHaveLength(2);
    expect(screen.getByTestId('startIndex').textContent).toBe('10');
    expect(screen.getByTestId('endIndex').textContent).toBe('20');
  });
});
