import React, { useEffect, useState } from 'react';
import styles from '../../../scss/Section3.module.scss';
import { motion } from 'framer-motion';

const Section3 = () => {
  return (
    <div className={styles.section3container}>
      <div className={styles.section3InnerBox}>
        <motion.div
          className={styles.box1}
          initial={{ y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            y: { duration: 0.66 },
          }}
        >
          <div className={styles.minibox1Youtube}>
            <iframe
              className={styles.section3Iframe}
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/LkAREImGcBs'
            ></iframe>
          </div>
          <div className={styles.minibox1Text}>
            <h1>삿포로 거기가 어딘데?</h1>
            일본 여행 고수가 소개해주는 랜선 투어
            <br /> 도쿄에서 부터 일본 전 지역
            <br />
            낯선 여행지도 두렵지 않아요~
            <br />
            초밥! 돈카츠도 놓치지마세요!!
          </div>
        </motion.div>
        <motion.div
          className={styles.box2}
          initial={{ y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            y: { duration: 1.32 },
          }}
        >
          <div className={styles.minibox2Text}>
            <h1>삿포로는 언제부터 아름다웠을까</h1>
            여행하기 좋은 따뜻한 날씨
            <br />
            아름다운 풍경과 낭만을 품은 도시
            <br />
            눈밭을 따라 늘어선 아름다운 도시들
            <br />
            다양한 볼거리와 먹거리의 매력까지
            <br />
            우리는 지금 바로 여기 삿포로!
          </div>
        </motion.div>
        <motion.div
          className={styles.box3}
          initial={{ y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            y: { duration: 2 },
          }}
        >
          <div className={styles.minibox3Picture}></div>
          <div className={styles.minibox3Text}>
            <h1>지금 예약하면 딱 좋은!</h1>
            기대 이상의 감동!
            <br />
            마음에 담는 진한 감동
            <br />
            오색빛 물의 향연
            <br />
            힐링하기에 최고인 나라
            <br />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Section3;
