import React, { useEffect, useState } from 'react';
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
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY && currentY > 80);
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${styles.header} ${hidden ? styles.hidden : ''}`}
      data-testid="tracks-header"
    >
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
