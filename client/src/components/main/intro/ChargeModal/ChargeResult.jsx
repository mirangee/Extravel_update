import React from 'react';
import styles from '../../../../scss/ChargeResult.module.scss';

const ChargeResult = ({ pointInfo, setPayResult }) => {
  const eventHandler = () => {
    console.log('charge result 컴포넌트에서 버튼 클릭됨!');
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
