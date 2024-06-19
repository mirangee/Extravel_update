import React from 'react';
import styles from '../scss/Footer.module.scss';
import logo0 from '../assets/img/tour_logos/naver.png';
import logo1 from '../assets/img/tour_logos/norang.png';
import logo2 from '../assets/img/tour_logos/onlinetour.png';
import logo3 from '../assets/img/tour_logos/interpark_tour.png';
import logo4 from '../assets/img/tour_logos/kakaopay.png';
import extravelLogo from '../assets/img/logo_white.png';
import { IoMdMail } from 'react-icons/io';

const Footer = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <img src={logo0} alt='description' />
        <img src={logo1} alt='description' />
        <img src={logo2} alt='description' />
        <img src={logo3} alt='description' />
        <img src={logo4} alt='description' />
      </div>

      <div className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.info}>
            <ul className={styles.menu}>
              <li>회사소개</li>
              <li>제휴제안</li>
              <li>이용약관</li>
            </ul>
            <div className={styles.description}>
              <div>
                대표 : 김태훈 &nbsp;&nbsp;&nbsp;사업자
                등록번호 : 000-00-0000
              </div>
              <div>
                사업장 소재지 : 서울 마포구 백범로 23
                케이터틀 3층
              </div>
            </div>
          </div>
          <div className={styles.logo}>
            <h2>
              <img src={extravelLogo} alt='ft-logo' />
            </h2>
            <p>
              &#x00A9; 2024 Copyright ExTravel All Rights
              Reserved.
            </p>
          </div>
          <div className={styles.email}>
            <p>
              <span>
                <IoMdMail />
                &nbsp; Mail us, stay updated
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
