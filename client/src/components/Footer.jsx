import React from 'react';
import '../scss/Footer.scss';
import logo0 from '../assets/img/tour_logos/naver.png';
import logo1 from '../assets/img/tour_logos/norang.png';
import logo2 from '../assets/img/tour_logos/onlinetour.png';
import logo3 from '../assets/img/tour_logos/interpark_tour.png';
import logo4 from '../assets/img/tour_logos/kakaopay.png';
import extravelLogo from '../assets/img/logo_white.png';
import { IoMdMail } from 'react-icons/io';

const Footer = () => {
  return (
    <div className='wrap'>
      <div className='logo-container'>
        <img src={logo0} alt='description' />
        <img src={logo1} alt='description' />
        <img src={logo2} alt='description' />
        <img src={logo3} alt='description' />
        <img src={logo4} alt='description' />
      </div>

      <div className='footer'>
        <div className='footer-inner'>
          <div className='company-info'>
            <ul className='menu'>
              <li>회사소개</li>
              <li>제휴제안</li>
              <li>이용약관</li>
            </ul>
            <div className='description'>
              <p>
                대표 : 김상진 &nbsp;&nbsp;&nbsp;사업자
                등록번호 : 000-00-0000
              </p>
              <p>
                사업장 소재지 : 서울 마포구 백범로 23
                케이터틀 3층
              </p>
            </div>
          </div>
          <div className='logo-part'>
            <h2 className='ft-logo'>
              <img src={extravelLogo} alt='ft-logo' />
            </h2>
            <p className='copyright'>
              &#x00A9; 2024 Copyright ExTravel All Rights
              Reserved.
            </p>
          </div>
          <div className='email-part'>
            <p className='mail'>
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
