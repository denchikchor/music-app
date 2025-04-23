import { render, screen } from '@testing-library/react';
import TrackInfo from '../TrackInfo';

describe('TrackInfo', () => {
  it('renders title, artist, album and genres', () => {
    render(
      <TrackInfo
        title="Imagine"
        artist="John Lennon"
        album="Best of Lennon"
        genres={['rock', 'classic']}
        id="1"
      />
    );

    expect(screen.getByText('Imagine')).toBeInTheDocument(); // title
    expect(screen.getByText('John Lennon')).toBeInTheDocument();
    expect(screen.getByText('Best of Lennon')).toBeInTheDocument(); // album
    expect(screen.getByText('rock')).toBeInTheDocument();
    expect(screen.getByText('classic')).toBeInTheDocument();
  });
});
