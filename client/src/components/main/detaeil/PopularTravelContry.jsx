import React from 'react';
import styles from '../../../scss/PopularTravelContry.module.scss'; // 스타일 파일 불러오기

const PopularTravelContry = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img
              src='https://cdn.pixabay.com/photo/2016/08/16/17/32/hollywood-sign-1598473_1280.jpg'
              alt='Image 1'
              style={{ width: '400px', height: '300px' }}
            />
            <div className={styles.caption}>America</div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/LZkivxR.jpg'
              alt='Image 2'
            />
            <div className={styles.caption}>
              By Cole Patrick
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/hqcMtrF.jpg'
              alt='Image 3'
            />
            <div className={styles.caption}>
              By Luke Pamer
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/l867sBU.jpg'
              alt='Image 4'
            />
            <div className={styles.caption}>
              By Alissa Smith
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.polaroid}>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/7cQCk5I.jpg'
              alt='Image 5'
            />
            <div className={styles.caption}>
              By Ales Krivec
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularTravelContry;
