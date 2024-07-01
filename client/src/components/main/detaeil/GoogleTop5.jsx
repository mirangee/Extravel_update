import React from 'react';
import styles from '../../../scss/GoogleTop5.module.scss';

const GoogleTop5 = () => {
  return (
    <>
      <div className={styles.GoogleTopContainer}>
        <h3 className={styles.mainH3}>
          구글 검색 트렌드 Top 6
        </h3>
        <div className={styles.sectionFluidMain}>
          <div className={styles.sectionRow}>
            {[
              {
                src: 'https://cdn.pixabay.com/photo/2014/02/17/10/20/statue-of-liberty-267948_1280.jpg',
                title: 'US',
              },
              {
                src: 'https://cdn.pixabay.com/photo/2015/03/14/11/09/buildings-673087_1280.jpg',
                title: '아랍에미리트',
              },
              {
                src: 'https://cdn.pixabay.com/photo/2017/06/15/14/04/masks-2405536_1280.jpg',
                title: 'Japen',
              },
              {
                src: 'https://cdn.pixabay.com/photo/2017/03/13/13/51/vietnam-2139871_1280.jpg',
                title: 'Vietnam',
              },
              {
                src: 'https://cdn.pixabay.com/photo/2018/07/18/20/25/channel-3547224_1280.jpg',
                title: 'Italia',
              },
              {
                src: 'https://cdn.pixabay.com/photo/2019/08/09/21/52/london-4395917_1280.jpg',
                title: 'London',
              },
            ].map((item, index) => (
              <div
                className={styles.sectionCol}
                key={index}
              >
                <div className={styles.section}>
                  <div className={styles.sectionIn}>
                    <img src={item.src} alt={item.title} />
                  </div>
                </div>
                <div className={styles.hoverText}>
                  <h2>{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleTop5;
