import React from 'react';
import '../../../scss/MyPage.scss';
import { motion } from 'framer-motion';

const MyPagePointCard = () => {
  return (
    <>
      <motion.div
        className='PageBox'
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <h1 className='PageHeader'>ETP Point history🛫</h1>
        <div className='PointBox'>
          <div className='Point'>충전</div>
          <ul>
            <li>2024/07/02</li>
            <li>ExTravel 포인트 충전 5000원</li>
            <li> + 적립 포인트 0.1% : 5p</li>
          </ul>
          <h2>+ 50005P</h2>
        </div>
      </motion.div>
    </>
  );
};

export default MyPagePointCard;
