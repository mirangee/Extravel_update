import React from 'react';
import '../../../scss/Section1.scss';
import rectangle from '../../../assets/img/home2.jpg';

const Section1 = () => {
  return (
    <>
      <div className='section1-body'>
        <div className='left'>
          <h1 className='section1-title'>
            Exchange
            <br />
            Travel
          </h1>
          <h5>
            환전하면 적립되는 포인트로 투어 패키지를 구매해
            더욱 큰 혜택을 누리세요.
          </h5>
          <button className='section1-explore'>
            Explore
          </button>
        </div>
        <div className='side-rectangle'>
          <div>
            5 best places <br /> to visit <br />
            <button className='more'>More →</button>
          </div>
          <img src={rectangle} />
        </div>
      </div>
    </>
  );
};

export default Section1;
