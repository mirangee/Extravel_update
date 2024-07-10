import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../scss/FlightHeader.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
const FlightHeader = ({ loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${loading ? styles.header2 : styles.header} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.headerText}>
          <span className={styles.span1}> Extravel </span>
          <span className={styles.span2}>항공권 검색</span>
        </div>
      </div>
    </>
  );
};

export default FlightHeader;
