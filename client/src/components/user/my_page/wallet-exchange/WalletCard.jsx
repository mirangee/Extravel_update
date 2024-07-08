import React from 'react';
import styles from '../../../../scss/WalletCard.module.scss';
import { motion } from 'framer-motion';

const WalletCard = ({ key, item }) => {
  const { currencyCode, exchangeAmount, flag } = item;
  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }
  return (
    <>
      <motion.div
        key={key}
        className={styles.pageBox}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <div className={styles.pointBox}>
          <div className={styles.point}>
            <img
              src={removeInvalidChars(atob(flag))}
              alt='flag'
            />
          </div>
          <ul>
            <li>
              &nbsp;&nbsp;{' '}
              {exchangeAmount.toLocaleString('ko-KR')}&nbsp;
              {currencyCode}{' '}
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default WalletCard;
