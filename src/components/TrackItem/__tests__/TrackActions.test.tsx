import { render, screen, fireEvent } from '../../../test-utils';
import TrackActions from '../TrackActions';

import React from 'react';

export const customRender = (ui: React.ReactElement) => render(<>{ui}</>);


describe('TrackActions', () => {
  const baseProps = {
    trackId: 'track-1',
    onEdit: jest.fn(),
    showCheckbox: true,
    checked: false,
    onCheckboxChange: jest.fn(),
  };

  it('renders checkbox when showCheckbox is true', () => {
    render(<TrackActions {...baseProps} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('does not render checkbox when showCheckbox is false', () => {
    render(<TrackActions {...baseProps} showCheckbox={false} />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<TrackActions {...baseProps} />);
    const button = screen.getByTestId(`edit-track-${baseProps.trackId}`);
    fireEvent.click(button);
    expect(baseProps.onEdit).toHaveBeenCalled();
  });

  it('calls onCheckboxChange when checkbox is clicked', () => {
    render(<TrackActions {...baseProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(baseProps.onCheckboxChange).toHaveBeenCalled();
  });
});
