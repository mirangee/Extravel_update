import {
  faArrowRight,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardActions } from '@mui/material';
import React from 'react';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import styles from '../../../../scss/MyPageCard.module.scss';
import etpLogo from '../../../../assets/img/logo.png';

const MyPageCard = ({ key, item }) => {
  const {
    currencyCode,
    amount,
    exchangeRate,
    transactionDate,
    useEtPoint,
    flag,
  } = item;
  const slicedDate = transactionDate.slice(
    0,
    transactionDate.indexOf('T'),
  );

  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }
  return (
    <>
      <motion.div
        key={key}
        className={styles.myPageCardContainer}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <div className={styles.currentDate}>
          {slicedDate}
        </div>
        <div className={styles.cardContainer}>
          <CardActions className={styles.cardActions}>
            <div className={styles.etpLogo}>
              <img src={etpLogo} alt='etpLogo' />

              <p>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{
                    fontSize: '14px',
                  }}
                />
                &nbsp;&nbsp;1 {currencyCode} ={' '}
                {exchangeRate.toLocaleString('ko-KR')} ETP
              </p>
              <h3>
                {useEtPoint.toLocaleString('ko-KR')} ETP
              </h3>
            </div>
          </CardActions>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ fontSize: '64px', marginTop: '65px' }}
          />
          <CardActions className={styles.cardActions}>
            <div className={styles.flag}>
              <img
                src={removeInvalidChars(atob(flag))}
                alt='flag'
              />
              <h3>
                {amount.toLocaleString('ko-KR')}{' '}
                {currencyCode}
              </h3>
            </div>
          </CardActions>
        </div>
      </motion.div>
    </>
  );
};

export default MyPageCard;
