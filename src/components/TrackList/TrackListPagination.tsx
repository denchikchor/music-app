import React from 'react';
import Pagination from '../Pagination/Pagination';
import styles from './TrackList.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TrackListPagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.paginationWrapper}>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default TrackListPagination;
