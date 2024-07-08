import React, { useRef } from 'react';
import styles from '../../../scss/Section1.module.scss';
import rectangle from '../../../assets/img/home2.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Section1 = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  //스크롤 부분
  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  //버튼 부분

  return (
    <>
      <div className={styles.section1Body}>
        <div className={styles.section1Left}>
          <h1 className={styles.section1Title}>
            Exchange
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Travel
          </h1>
          <h5 className={styles.section1Small}>
            포인트 충전으로 등급에 따라 최대 0.3% 추가 적립!{' '}
            <br />
            환율별 여행지 추천과 최신 뉴스까지, ExTravel에서
            확인하세요.
          </h5>
          <motion.button
            className={styles.section1Explore}
            onClick={goToLogin}
            whileHover={{
              scale: 1.2,
            }}
          >
            Explore
          </motion.button>
        </div>
        <motion.div
          className={styles.section1SideRectangle}
        >
          <div>
            Check real-time <br />
            exchange rates. <br />
            <motion.button
              className={styles.section1More}
              whileHover={{ scale: 1.2 }}
              onClick={scrollToBottom}
            >
              More →
            </motion.button>
          </div>
          <img src={rectangle} />
        </motion.div>
      </div>
      <div ref={bottomRef}>
        {/* 이 요소는 스크롤할 목표 요소입니다 */}
      </div>
    </>
  );
};

export default Section1;
