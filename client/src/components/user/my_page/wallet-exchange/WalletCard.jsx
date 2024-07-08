import React from 'react';
import styles from '../../../../scss/WalletCard.module.scss';
import { motion } from 'framer-motion';

const WalletCard = () => {
  const key = 1;
  const amount = 10000;
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
            <img src='../' alt='flag' />
          </div>
          <ul>
            <li>
              &nbsp;&nbsp; {amount.toLocaleString('ko-KR')}
              원{' '}
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default WalletCard;
