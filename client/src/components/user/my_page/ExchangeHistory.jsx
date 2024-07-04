import React from 'react';
import styles from '../../../scss/ExchangeHistory.module.scss';
import MyPageCard from './MyPageCard';

const ExchangeHistory = () => {
  return (
    <>
      <h3 className={styles.myExchangeHeader}>
        My Exchange{' '}
        {/* <Button className={styles.exchangeButton}>
          추가 환전하기
        </Button> */}
      </h3>
      <MyPageCard />
    </>
  );
};

export default ExchangeHistory;
