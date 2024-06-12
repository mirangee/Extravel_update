import React from 'react';
import styles from '../../../scss/Section3.module.scss';
const Section3 = () => {
  return (
    <div className={styles.section3container}>
      <div className={styles.spacer}></div>
      <div className={styles.box1}>
        <div className={styles.minibox1Youtube}>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/LkAREImGcBs'
          ></iframe>
        </div>
        <div className={styles.minibox1Text}>
          <h1>삿포로 거기가 어딘데?</h1>
          일본여행고수가 소개해주는 랜선투어
          <br /> 도쿄에서부터 일본전지역
          <br />
          낯선여행지도 두렵지않아요~
          <br />
          초밥! 돈카츠도 놓치지마세요!!
        </div>
      </div>
      <div className={styles.box2}>
        <div className={styles.minibox2Text}>
          <h1>삿포로는 언제부터 아름다웠을까</h1>
          여행하기좋은따뜻한날씨
          <br />
          아름다운 풍경과 낭만을 품은 도시
          <br />
          눈밭을따라 늘어선 아름다운도시들
          <br />
          다양한 볼거리와 먹거리의 매력까지
          <br />
          <br />
          우리는 지금바로 여기 삿포로!
        </div>
      </div>
      <div className={styles.box3}>
        <div className={styles.minibox3Picture}></div>
        <div className={styles.minibox3Text}>
          <h1>지금 예약하면 정말좋은!</h1>
          기대이상의 감동!
          <br />
          마음에 담는 진한 감동
          <br />
          오색빛 물의향연
          <br />
          힐링하기에최고인나라
          <br />
        </div>
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
};

export default Section3;
