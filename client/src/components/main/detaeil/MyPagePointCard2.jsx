import React from 'react';
import '../../../scss/MyPage.scss';
import { motion } from 'framer-motion';

const MyPagePointCard2 = () => {
  return (
    <>
      <motion.div
        className='PageBox'
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        {/* <h1 className='PageHeader'>ETP Point history🛫</h1> */}
        <div className='PointBox2'>
          <div className='Point'>사용</div>
          <ul>
            <li>2024/07/02</li>
            <li>ExTravel 포인트 사용 5000P</li>
            {/* <li> + 적립 포인트 0.1% : 5p</li> */}
          </ul>
          <h2>505P</h2>
        </div>
      </motion.div>
    </>
  );
};

export default MyPagePointCard2;
