import React from 'react';
import styles from '../../../scss/MyPagePointCard.module.scss';
import { motion } from 'framer-motion';

const MyPagePointCard = ({ key, item }) => {
  const { amount, plusPoint, createdAt, sum } = item;
  const slicedDate = createdAt.slice(
    0,
    createdAt.indexOf('T'),
  );
  return (
    <>
      <motion.div
        key={key}
        className={styles.pageBox}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <div className={styles.pointBox}>
          <div className={styles.point}>충전</div>
          <ul>
            <li>{slicedDate}</li>
            <li>
              ET 포인트 충전{' '}
              <span>
                &nbsp;&nbsp;{' '}
                {amount.toLocaleString('ko-KR')}원{' '}
              </span>
            </li>
            <li>
              {' '}
              &nbsp;&nbsp; + 적립 포인트{' '}
              <span>
                &nbsp;&nbsp;{' '}
                {plusPoint.toLocaleString('ko-KR')}p
              </span>
            </li>
          </ul>
          <h2>+ {sum.toLocaleString('ko-KR')}P</h2>
        </div>
      </motion.div>
    </>
  );
};

export default MyPagePointCard;
