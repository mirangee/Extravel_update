import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Select from 'react-select';
import styles from '../scss/Header.module.scss';
import logoImage from '../assets/img/logo_white.png';
import axios from 'axios';
import AuthContext from '../utils/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyCheckDollar,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import ChargeModal from './main/intro/ChargeModal/ChargeModal';
import { render } from '@testing-library/react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState('US');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, name, onLogout, onChangeNation } =
    useContext(AuthContext);
  const { nation } = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const redirection = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const location = useLocation();
  const render = location.pathname !== '/';

  const goToIntro = () => {
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };
  // 로그아웃 핸들러
  const clickLogoutHandler = () => {
    onLogout();
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

  useEffect(() => {
    if (nation) {
      setCountry(nation);
    }
  }, [nation]);

  const handleCountryChange = (selectedOption) => {
    onChangeNation(selectedOption.value);
    setCountry(selectedOption.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }

  return (
    <>
      <header
        className={`${styles.header} ${scrolled || render ? styles.scrolled : ''}`}
      >
        <img
          src={logoImage}
          alt='Logo'
          className={styles.logo}
          onClick={goToIntro}
        />
        <div
          className={styles.hamburger}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size='2x' />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {isLoggedIn && (
              <>
                <li
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    paddingRight: '75px',
                    minWidth: '260px',
                    paddingLeft: '30px',
                  }}
                >
                  {isLoggedIn ? name + '님 안녕하세요' : ''}
                </li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link
                    to='/api/v1/shopping/'
                    onClick={scrollToTop}
                  >
                    패키지
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/flight' onClick={scrollToTop}>
                    항공권
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link
                    to='/main/exrates'
                    onClick={scrollToTop}
                  >
                    환율 정보
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }}>
                  <Link to='/mypage' onClick={scrollToTop}>
                    내&nbsp;&nbsp;정보
                  </Link>
                </motion.li>
              </>
            )}
            {isLoggedIn && (
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggleDropdown}
                direction='down'
              >
                <DropdownToggle
                  caret
                  style={{ background: '#14505c' }}
                >
                  <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    size='xl'
                    style={{ color: '#38bc8a' }}
                  />
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    backgroundColor: 'white',
                    zIndex: '1500',
                  }}
                >
                  <ChargeModal
                    toggle={toggleDropdown}
                    modalOpen={dropdownOpen}
                  />
                </DropdownMenu>
              </Dropdown>
            )}
            <li>
              {isLoggedIn && (
                <Select
                  value={countryOptions.find(
                    (option) => option.value === country,
                  )}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  className={styles.countrySelect}
                  classNamePrefix={styles.reactSelect}
                />
              )}
            </li>
            <ul>
              {isLoggedIn ? (
                <li
                  type='button'
                  className={styles.logout}
                  onClick={clickLogoutHandler}
                >
                  로그아웃
                </li>
              ) : (
                <>
                  <Link
                    to='/login'
                    className={styles.login}
                    onClick={scrollToTop}
                  >
                    로그인
                  </Link>
                </>
              )}
            </ul>
          </ul>
        </nav>
      </header>

      <div
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
      >
        <div
          className={styles.closeButton}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size='2x' />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>
              <Link
                to='/api/v1/shopping/'
                onClick={toggleSidebar}
              >
                패키지
              </Link>
            </li>
            <li>
              <Link to='/main' onClick={toggleSidebar}>
                뉴스
              </Link>
            </li>
            <li>
              <Link
                to='/main/exrates'
                onClick={toggleSidebar}
              >
                환율 정보
              </Link>
            </li>
            <li>
              <Link to='/mypage' onClick={toggleSidebar}>
                내&nbsp;&nbsp;정보
              </Link>
            </li>
            <li>
              <Select
                value={countryOptions.find(
                  (option) => option.value === nation,
                )}
                onChange={handleCountryChange}
                options={nation}
                className={styles.countrySelect}
                classNamePrefix={styles.reactSelect}
              />
            </li>
            {isLoggedIn && (
              <li>
                <button
                  className={styles.logout}
                  onClick={clickLogoutHandler}
                >
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
