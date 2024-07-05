import React from 'react';
import styles from '../../../../scss/MyPagePointCard2.module.scss';
import { motion } from 'framer-motion';

const MyPagePointCard2 = ({ key, item }) => {
  const { amount, createdAt } = item;
  const slicedDate = createdAt.slice(
    0,
    createdAt.indexOf('T'),
  );
  return (
    <>
      <motion.div
        className={styles.pageBox}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <div className={styles.pointBox2}>
          <div className={styles.point}>사용</div>
          <ul>
            <li>{slicedDate}</li>
            <li>
              ET 포인트 사용{' '}
              <span>
                &nbsp;&nbsp;{' '}
                {amount.toLocaleString('ko-KR')}P{' '}
              </span>
            </li>
          </ul>
          <h2>- {amount.toLocaleString('ko-KR')}P</h2>
        </div>
      </motion.div>
    </>
  );
};

export default MyPagePointCard2;
