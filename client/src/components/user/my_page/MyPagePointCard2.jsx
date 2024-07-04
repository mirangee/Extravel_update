import React from 'react';
import styles from '../../../scss/MyPagePointCard2.module.scss';
import { motion } from 'framer-motion';

const MyPagePointCard2 = () => {
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
            <li>2024/07/02</li>
            <li>ET 포인트 사용 &nbsp;&nbsp; 5000P</li>
          </ul>
          <h2>- 505P</h2>
        </div>
      </motion.div>
    </>
  );
};

export default MyPagePointCard2;
