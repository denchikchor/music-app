jest.mock('../../CustomAudioPlayer/CustomAudioPlayer', () => () => (
  <div data-testid="mock-audio-player">AudioPlayer</div>
));
jest.mock('../../TrackUpload/TrackUpload', () => ({ trackId }: { trackId: string }) => (
  <div data-testid="mock-upload">Upload for {trackId}</div>
));

import { render, screen } from '../../../test-utils';
import TrackPlayer from '../TrackPlayer';




describe('TrackPlayer', () => {
  const baseProps = {
    trackId: '1',
    isActive: false,
    audioFile: '',
    updatedAt: new Date().toISOString(),
    onTogglePlay: jest.fn(),
    onTrackEnd: jest.fn(),
    onPlayStart: jest.fn(),
  };

  it('renders CustomAudioPlayer when audioFile is provided', () => {
    render(<TrackPlayer {...baseProps} audioFile="file.mp3" />);
    expect(screen.getByTestId('mock-audio-player')).toBeInTheDocument();
  });

  it('does not render CustomAudioPlayer when audioFile is not provided', () => {
    render(<TrackPlayer {...baseProps} />);
    expect(screen.queryByTestId('mock-audio-player')).not.toBeInTheDocument();
  });

  it('renders TrackUpload with correct trackId', () => {
    render(<TrackPlayer {...baseProps} />);
    expect(screen.getByTestId('mock-upload')).toHaveTextContent('Upload for 1');
  });
});
 