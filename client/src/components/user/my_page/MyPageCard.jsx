import {
  faArrowRight,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardActions } from '@mui/material';
import React from 'react';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import styles from '../../../scss/MyPageCard.module.scss';
import etpLogo from '../../../assets/img/logo.png';

const MyPageCard = () => {
  return (
    <>
      <motion.div
        className={styles.myPageCardContainer}
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <div className={styles.currentDate}>2024-07-03</div>
        <div className={styles.cardContainer}>
          <CardActions className={styles.cardActions}>
            <div className={styles.etpLogo}>
              <img src={etpLogo} alt='KR' />

              <p>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{
                    fontSize: '14px',
                  }}
                />
                &nbsp;&nbsp;1 USD = 1,381 ETP
              </p>
              <h3>276,200 ETP</h3>
            </div>
          </CardActions>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ fontSize: '64px', marginTop: '100px' }}
          />
          <CardActions className={styles.cardActions}>
            <div className={styles.flag}>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/150px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                alt='US'
              />
              <h3>200 USD</h3>
            </div>
          </CardActions>
        </div>
      </motion.div>
    </>
  );
};

export default MyPageCard;
