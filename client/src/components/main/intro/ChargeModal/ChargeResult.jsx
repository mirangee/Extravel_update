import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../../../../scss/ChargeResult.module.scss';
import AuthContext from '../../../../utils/AuthContext';

const ChargeResult = ({ pointInfo, setPayResult }) => {
  const { grade } = useContext(AuthContext);
  if (
    pointInfo.countPoint >= 5000000 &&
    grade === 'BRONZE'
  ) {
    alert('축하합니다! SILVER 등급으로 승급되었습니다.');
  } else if (
    pointInfo.countPoint >= 10000000 &&
    grade === 'SILVER'
  ) {
    alert('축하합니다! GOLD 등급으로 승급되었습니다.');
  }
  const eventHandler = () => {
    setPayResult(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chargeSuccess}>
          ETP 충전이 완료되었습니다!
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.pointOuterContainer}>
            <div className={styles.chargeAmountTitle}>
              충전 금액
            </div>
            <div className={styles.pointContainer}>
              <div className={styles.point}>
                {pointInfo.amount.toLocaleString('ko-KR')}{' '}
              </div>{' '}
              원
            </div>
          </div>

          <div className={styles.pointOuterContainer}>
            <div className={styles.chargeAmountTitle}>
              추가 적립 포인트
            </div>
            <div className={styles.pointContainer}>
              <div className={styles.point}>
                {pointInfo.plusPoint.toLocaleString(
                  'ko-KR',
                )}{' '}
              </div>{' '}
              P
            </div>
          </div>
          <div className={styles.pointOuterContainer}>
            <div className={styles.chargeAmountTitle}>
              현재 보유 포인트
            </div>
            <div className={styles.pointContainer}>
              <div className={styles.point}>
                {pointInfo.etPoint.toLocaleString('ko-KR')}{' '}
              </div>{' '}
              P
            </div>
          </div>
          <div className={styles.pointOuterContainer}>
            <div className={styles.chargeAmountTitle}>
              누적 충전 포인트
            </div>
            <div className={styles.pointContainer}>
              <div className={styles.point}>
                {pointInfo.countPoint.toLocaleString(
                  'ko-KR',
                )}{' '}
              </div>{' '}
              P
            </div>
          </div>

          <button
            className={styles.chargeBtn}
            onClick={eventHandler}
          >
            더 충전하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ChargeResult;
