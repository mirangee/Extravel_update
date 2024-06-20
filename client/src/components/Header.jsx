import React, {
  useEffect,
  useState,
  useContext,
} from 'react';

import Select from 'react-select';
import styles from '../scss/Header.module.scss';
import logoImage from '../assets/img/logo_white.png';
import axios from 'axios';
import AuthContext from '../utils/AuthContext';
import { API_BASE_URL, USER } from '../config/host-config';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();
  const {
    inLoggedIn,
    name,
    onChangeNation,
    nation,
    onLogout,
  } = useContext(AuthContext);

  const redirection = useNavigate();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  //로그아웃 핸들러
  const clickLogoutHandler = () => {
    onLogout();
    // inLoggedIn(false);
    redirection('/');
    alert('로그아웃 되었습니다.');
  };

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
            <li className={styles.login}>
              {inLoggedIn ? name + '님' : '안녕하세요'},
              좋은 하루 되세요.
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
            <ul>
              {inLoggedIn ? (
                <li
                  type='button'
                  className={styles.logout}
                  onClick={clickLogoutHandler}
                >
                  로그아웃
                </li>
              ) : (
                <>
                  <Link to='/login'>로그인</Link>
                </>
              )}
            </ul>
          </ul>
        </nav>
      </header>
      <div className={styles.fake}></div>
    </>
  );
};

export default Header;
