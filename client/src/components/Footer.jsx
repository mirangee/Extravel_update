import React from 'react';
import '../scss/Footer.scss';
import logo0 from '../assets/img/tour_logos/naver.png';
import logo1 from '../assets/img/tour_logos/norang.png';
import logo2 from '../assets/img/tour_logos/onlinetour.png';
import logo3 from '../assets/img/tour_logos/interpark_tour.png';
import logo4 from '../assets/img/tour_logos/kakaopay.png';
import extravelLogo from '../assets/img/logo.png';

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
      <div className='inner'>
        <h2 className='ft-logo'>
          <img src={extravelLogo} alt='ft-logo' />
        </h2>
        <p className='copyright'>
          &#x00A9; 2024 Copyright ExTravel All Rights
          Reserved.
        </p>
        <ul className='list'>
          <li>
            <span>Mail us, stay updated</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
