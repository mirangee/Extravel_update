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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();
  const { inLoggedIn, name } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown 열림 상태 추가
  const [direction] = useState('down'); // Dropdown 방향 설정
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigateIntro = useNavigate();
  const goToIntro = () => {
    navigateIntro('/');
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
                {inLoggedIn
                  ? name + '님 좋은 하루 되세요.'
                  : ''}
                <li
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    paddingRight: '105px',
                  }}
                >
                  {inLoggedIn ? name + '님' : '오늘'}의 할일
                </li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/home'>패키지</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/about'>뉴스</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/services'>내&nbsp;&nbsp;정보</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/contact'>Places</Link>
                </motion.li>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                  direction={direction}
                >
                  <DropdownToggle
                    caret
                    style={{ background: '#14505c' }}
                  >
                    <FontAwesomeIcon
                      icon={faMedal}
                      size='xl'
                      style={{ color: '#ffffff' }}
                    />
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      backgroundColor: 'white',

                      zIndex: '1500',
                    }}
                  >
                    <DropdownItem
                      header
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMedal}
                        size='2xl'
                        style={{ color: '#c2aa4c' }}
                      />
                      &nbsp; 브론즈 회원: &nbsp; 회원가입한 모든
                      회원, 포인트 충전 금액의 0.5% 적립
                    </DropdownItem>
                    <DropdownItem
                      header
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMedal}
                        size='2xl'
                        style={{ color: '#e2e6ee' }}
                      />
                      &nbsp; 실버 회원: &nbsp; 포인트 충전 누적
                      금액 5백만 원 이상, 포인트 충전 금액의
                      1.0% 적립
                    </DropdownItem>
                    <DropdownItem
                      header
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMedal}
                        size='2xl'
                        style={{ color: '#FFD43B' }}
                      />
                      &nbsp; 골드 회원: &nbsp; 포인트 충전 누적
                      금액 1천만 원 이상, 포인트 충전 금액의
                      1.5% 적립
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

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
        {/* <div className={styles.fake}></div> */}
      </>
    );
  };

  export default Header;
