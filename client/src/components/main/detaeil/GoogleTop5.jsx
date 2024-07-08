import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../../../scss/GoogleTop5.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../utils/AuthContext';
const GoogleTop5 = () => {
  const [trendList, setTrendList] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    getSearchTrend();
  }, []);
  const { onChangeNation } = useContext(AuthContext);

  const getSearchTrend = async () => {
    const res = await axios.get(
      API_BASE_URL + '/api/trend/data',
    );
    setTrendList(res.data);
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
                onClick={() => {
                  onChangeNation(item.nationCode);
                  navi('/main');
                }}
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
