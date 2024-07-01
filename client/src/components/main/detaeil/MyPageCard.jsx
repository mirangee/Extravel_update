import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import styles from '../../../scss/MyPageCard.module.scss'; // Import the styles

const MyPageCard = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // 페이지가 로드될 때 현재 날짜를 가져와서 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(
      2,
      '0',
    );
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}/${month}/${day}`);
  }, []);

  return (
    <>
      <motion.div
        className={styles.myPageCardContainer}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <h3 className={styles.myExchangeHeader}>
          My Exchange{' '}
          <Button className={styles.exchangeButton}>
            추가 환전하기
          </Button>
        </h3>
        <div className={styles.currentDate}>
          {currentDate}
        </div>
        <div className={styles.cardContainer}>
          <CardActions className={styles.cardActions}>
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/150px-Flag_of_South_Korea.svg.png'
                alt='KR'
              />
              <ul>
                <li>1,381 KRW = 1 USD</li>
                <h3>276,200 KRW</h3>
              </ul>
            </div>
          </CardActions>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ fontSize: '64px', marginTop: '85px' }}
          />
          <CardActions className={styles.cardActions}>
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/150px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                alt='US'
              />
              <ul>
                <li>200 USD</li>
              </ul>
            </div>
          </CardActions>
        </div>

        {/* 카드 2부분 */}
        <div
          className='card2'
          style={{ width: '100%', marginTop: '30px' }}
        >
          <div className={styles.currentDate}>
            {currentDate}
          </div>
          <div className={styles.cardContainer}>
            <CardActions className={styles.cardActions}>
              <div>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/150px-Flag_of_South_Korea.svg.png'
                  alt='KR'
                />
                <ul>
                  <li>1,381 KRW = 1 USD</li>
                  <h3>276,200 KRW</h3>
                </ul>
              </div>
            </CardActions>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                fontSize: '64px',
                marginTop: '85px',
              }}
            />
            <CardActions className={styles.cardActions}>
              <div>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/150px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                  alt='US'
                />
                <ul>
                  <li>200 USD</li>
                </ul>
              </div>
            </CardActions>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MyPageCard;
