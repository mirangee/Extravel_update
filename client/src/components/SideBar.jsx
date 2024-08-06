import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { BsXLg } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChargeModal from './main/intro/ChargeModal/ChargeModal';
import Select from 'react-select';
import styles from '../scss/Sidebar.module.scss';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../utils/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from './../config/host-config';

const SideBar = ({
  setSidebarOpen,
  sidebarOpen,
  toggleSidebar,
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup 이벤트 리스너
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState('US');
  const { nation, onLogout, onChangeNation } =
    useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const redirection = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        .get(`${API_BASE_URL}/api/nation`)
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

  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }
  return (
    <>
      <nav
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
      >
        <BsXLg
          className={styles.closeButton}
          onClick={toggleSidebar}
        />
        <ul className={styles.menu}>
          <>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link
                to='/package/v1/shopping/'
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
          <ul>
            <li
              type='button'
              className={styles.logout}
              onClick={clickLogoutHandler}
            >
              로그아웃
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
