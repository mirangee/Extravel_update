import React from 'react';
import styles from '../../../scss/PopularTravelContry.module.scss'; // 스타일 파일 불러오기

const PopularTravelContry = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <h3
          style={{
            fontSize: '50px',
            marginLeft: '180px',
            fontWeight: 'bold',
            fontFamily: 'Black Han Sans',
            color: '#14505C',
            marginTop: '200px',
            // background: 'red',
          }}
        >
          다양한 나라들을 여행해보세요 🚩
        </h3>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2016/08/16/17/32/hollywood-sign-1598473_1280.jpg'
                alt='US'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>US</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2017/02/18/13/08/japan-2077172_1280.jpg'
                alt='Japan'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>Japan</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2019/04/04/17/58/road-4103334_1280.jpg'
                alt='China'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>China</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2019/03/19/14/41/bridge-4065865_1280.jpg'
                alt='Taiwan'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>Taiwan</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2022/04/06/20/30/big-ben-7116305_1280.jpg'
                alt='UK'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>Uk</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2022/02/03/12/03/river-6990295_1280.jpg'
                alt='Rusia'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>Rusia</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg'
                alt='France'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>France</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.polaroid}>
              <img
                src='https://cdn.pixabay.com/photo/2019/03/31/14/31/houses-4093227_1280.jpg'
                alt='Italia'
                style={{ width: '500px', height: '300px' }}
              />
              <div className={styles.caption}>Italia</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularTravelContry;
