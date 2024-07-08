import React from 'react';
import styles from '../../../../scss/MyPagePointCard2.module.scss';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const MyPagePointCard2 = ({ key, item }) => {
  const { amount, createdAt } = item;
  const slicedDate = createdAt.slice(
    0,
    createdAt.indexOf('T'),
  );
  const slicedDate2 = createdAt.slice(
    createdAt.indexOf('T') + 1,
    createdAt.indexOf('T') + 6,
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
            <li className={styles.time}>
              <FontAwesomeIcon icon={faClock} />
              &nbsp;&nbsp;
              {slicedDate}&nbsp;&nbsp;{slicedDate2}{' '}
            </li>
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
