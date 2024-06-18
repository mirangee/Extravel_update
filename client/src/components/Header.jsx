import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styles from '../scss/Header.module.scss';
import logoImage from '../assets/img/logo_white.png';
import axios from 'axios';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState('US');
  const navigate = useNavigate();

  useEffect(() => {
    const getNationData = () => {
      axios
        .get('http://localhost:8181/api/nation')
        .then((res) => {
          const options = res.data.map((element) => ({
            value: element.nationCode,
            label: (
              <>
                <img
                  src={atob(element.flag)}
                  className={styles.flag}
                />{' '}
                {element.name}
              </>
            ),
          }));
          setCountryOptions(options);
        })
        .catch((error) =>
          console.error(
            'Error fetching nation data:',
            error,
          ),
        );
    };
    getNationData();

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

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
    if (selectedOption) {
      navigate(`/${selectedOption.value}`);
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      >
        <img
          src={logoImage}
          alt='Logo'
          className={styles.logo}
        />
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>
              <Link to='/home'>패키지</Link>
            </li>
            <li>
              <Link to='/about'>뉴스</Link>
            </li>
            <li>
              <Link to='/services'>내정보</Link>
            </li>
            <li>
              <Link to='/contact'>Places</Link>
            </li>
            <li>
              <Select
                value={countryOptions.find(
                  (option) => option.value === country,
                )}
                onChange={handleCountryChange}
                options={countryOptions}
                className={styles.countrySelect}
                classNamePrefix={styles.reactSelect}
              />
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.fake}></div>
    </>
  );
};

export default Header;
