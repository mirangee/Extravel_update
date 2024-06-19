import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styles from '../scss/Header.module.scss';
import logoImage from '../assets/img/logo_white.png';
import axios from 'axios';
import AuthContext from '../utils/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();
  const { inLoggedIn, name, onChangeNation, nation } =
    useContext(AuthContext);

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
                  src={removeInvalidChars(
                    atob(element.flag),
                  )}
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
    onChangeNation(selectedOption.value);
  };
  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }

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
              {inLoggedIn ? name + '님' : '안녕하세요!'},
              즐거운 하루 되세요.
            </li>
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
              {inLoggedIn && (
                <Select
                  value={countryOptions.find(
                    (option) => option.value === nation,
                  )}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  className={styles.countrySelect}
                  classNamePrefix={styles.reactSelect}
                />
              )}
            </li>
            <li>로그아웃</li>
          </ul>
        </nav>
      </header>
      <div className={styles.fake}></div>
    </>
  );
};

export default Header;
