import React from 'react';
import styles from '../../../../scss/WalletCard.module.scss';

const WalletCard = ({ key, item }) => {
  const { currencyCode, exchangeAmount, flag } = item;
  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }
  return (
    <>
      <div key={key} className={styles.pageBox}>
        <div className={styles.point}>
          <img
            src={removeInvalidChars(atob(flag))}
            alt='flag'
          />
          <div>
            &nbsp;&nbsp;{' '}
            {exchangeAmount.toLocaleString('ko-KR')}&nbsp;
            {currencyCode}{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
