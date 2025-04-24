import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TrackForm from '../TrackForm';

vi.mock('../../GenreSelector/GenreSelector', () => ({
  __esModule: true,
  default: ({ selected }: { selected: string[] }) => (
    <div data-testid="genre-selector">Genres: {selected.join(', ')}</div>
  ),
}));

describe('TrackForm', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    submitLabel: 'Save',
  };

  beforeEach(() => {
    defaultProps.onSubmit.mockClear();
    defaultProps.onCancel.mockClear();
  });

  it('renders inputs and submits valid form', async () => {
    render(<TrackForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId('input-title'), {
      target: { value: 'Test Track' },
    });
    fireEvent.change(screen.getByTestId('input-artist'), {
      target: { value: 'Test Artist' },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    expect(defaultProps.onSubmit).toHaveBeenCalledWith({
      title: 'Test Track',
      artist: 'Test Artist',
      album: '',
      coverImage: '',
      genres: [],
    });
  });

  it('shows validation errors if fields are empty', async () => {
    render(<TrackForm {...defaultProps} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    expect(screen.getByTestId('error-title')).toHaveTextContent('Track name is required');
    expect(screen.getByTestId('error-artist')).toHaveTextContent('Artist is required');
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(<TrackForm {...defaultProps} />);

    fireEvent.click(screen.getByTestId('cancel-button'));

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});
