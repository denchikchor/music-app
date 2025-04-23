import React from 'react';

interface Props {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const ToastMessage: React.FC<Props> = ({ message, type }) => (
  <div data-testid={`toast-${type}`}>{message}</div>
);

export default ToastMessage;
