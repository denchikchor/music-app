import React, { useEffect, useRef } from 'react';
import styles from './ModalWrapper.module.css';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<Props> = ({ children, onClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={handleClickOutside}
      data-testid="modal-backdrop"
    >
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default ModalWrapper;
