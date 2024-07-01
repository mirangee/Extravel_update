import React, { useEffect, useState } from 'react';
import styles from '../../../scss/GoogleTop5.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';

const GoogleTop5 = () => {
  const [trendList, setTrendList] = useState([]);

  useEffect(() => {
    getSearchTrend();
  }, []);

  const getSearchTrend = async () => {
    const res = await axios.get(
      API_BASE_URL + '/api/trend/data',
    );
    console.log(res.data.searchTrendList);
    setTrendList(res.data.searchTrendList);
  };
  return (
    <>
      <div className={styles.GoogleTopContainer}>
        <h3 className={styles.mainH3}>
          구글 검색 트렌드 Top 6
        </h3>
        <div className={styles.sectionFluidMain}>
          <div className={styles.sectionRow}>
            {trendList.map((item, index) => (
              <div
                className={styles.sectionCol}
                key={index}
              >
                <div className={styles.section}>
                  <div className={styles.sectionIn}>
                    <img
                      src={item.imgUrl}
                      alt={item.nationNameEn}
                    />
                  </div>
                </div>
                <div className={styles.hoverText}>
                  <h2>{item.nationNameEn}</h2>
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
