import React from 'react';
import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        className={styles.button}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        ⏮ Fitst
      </button>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="pagination-prev"
      >
        ← Back
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} from {totalPages}
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="pagination-next"
      >
        Forward →
      </button>

      <button
        className={styles.button}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        The last ⏭
      </button>
    </div>
  );
};

export default Pagination;
