import { render, screen, fireEvent } from '@testing-library/react';
import TrackActions from '../TrackActions';

describe('TrackActions', () => {
  const baseProps = {
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
    const button = screen.getByTestId('edit-button');
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
