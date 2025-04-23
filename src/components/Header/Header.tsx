import React from 'react';
import styles from './Header.module.css';
import Button from '../UI/Button/Button';
import SearchInput from '../SearchInput/SearchInput';
import { ReactComponent as Logo } from '../../assets/logo.svg';

interface Props {
  onCreate: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<Props> = ({ onCreate, searchValue, onSearchChange }) => {
  return (
    <header className={styles.header} data-testid="tracks-header">
      <div className={styles.left}>
        <Logo className={styles.logo} />
      </div>

      <div className={styles.center}>
        <SearchInput data-testid="search-input" value={searchValue} onChange={onSearchChange} />
      </div>

      <div className={styles.right}>
        <Button onClick={onCreate} data-testid="create-track-button" variant="primary">
          Create Track
        </Button>
      </div>
    </header>
  );
};

export default Header;
