import React from 'react';
import styles from '../../../../scss/ChargeModal.module.scss';
import goldMedal from '../../../../assets/img/gold.png';
import silverMedal from '../../../../assets/img/silver.png';
import bronzeMedal from '../../../../assets/img/bronze.png';

const ChargeTable = () => {
  return (
    <div className={styles.chargeTable}>
      <div className={styles.tableHeader}>
        <div className={styles.grade}>등급</div>
        <div className={styles.criteria}>기준</div>
        <div className={styles.benefit}>혜택</div>
      </div>
      <div className={styles.goldGrade}>
        <div>
          <img src={goldMedal} alt='Gold Medal' />
        </div>
        <div className={styles.money}>
          포인트 충전 누적 금액
          <br />
          <strong> 1천만 원</strong> 이상
        </div>
        <div>
          포인트 충전 금액의
          <br />
          <strong>0.3% </strong>적립
        </div>
      </div>
      <div className={styles.silverGrade}>
        <div>
          <img src={silverMedal} alt='Silver Medal' />
        </div>
        <div className={styles.money}>
          포인트 충전 누적 금액
          <br />
          <strong>5백만 원 </strong>이상
        </div>
        <div>
          포인트 충전 금액의
          <br />
          <strong>0.2% </strong>적립
        </div>
      </div>
      <div className={styles.bronzeGrade}>
        <div>
          <img src={bronzeMedal} alt='Bronze Medal' />
        </div>
        <div className={styles.money}>
          <strong>회원가입한 모든 회원</strong>
        </div>
        <div>
          포인트 충전 금액의
          <br />
          <strong>0.1%</strong> 적립
        </div>
      </div>
    </div>
  );
};

export default ChargeTable;
