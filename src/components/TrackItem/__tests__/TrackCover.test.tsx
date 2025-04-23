import { render, screen } from '@testing-library/react';
import TrackCover from '../TrackCover';
import coverImage from '../../../assets/default_cover.jpg';

describe('TrackCover', () => {
  it('renders fallback image if src fails to load', () => {
    render(<TrackCover src="/broken.jpg" alt="Broken Image" />);
    const image = screen.getByAltText('Broken Image') as HTMLImageElement;

    image.onerror?.(new Event('error'));
    image.src = coverImage;

    expect(image.src).toContain('default_cover.jpg');
  });
});
