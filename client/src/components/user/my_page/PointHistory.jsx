import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import MyPagePointCard from './MyPagePointCard';
import MyPagePointCard2 from './MyPagePointCard2';
import styles from '../../../scss/PointHistory.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';
import AuthContext from '../../../utils/AuthContext';

const PointHistory = () => {
  const { id } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [currentEtp, setCurrentEtp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          API_BASE_URL + '/history/point/' + id,
        );
        console.log(res.data);
        setHistory(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    async function fetchCurrentPoint() {
      try {
        const response = await axios.post(
          API_BASE_URL + '/payment/pointInfo',
          { id },
        );
        console.log(response.data);
        setCurrentEtp(response.data.etPoint);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // 비동기 함수 호출
    fetchCurrentPoint();
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.title}>
        {' '}
        <h1 className={styles.pageHeader}>ETP history🛫</h1>
        <p>
          {' '}
          보유 포인트 &nbsp;&nbsp;
          {currentEtp.toLocaleString('ko-KR')}P
        </p>
      </div>

      {history.map((item, key) => (
        <MyPagePointCard key={key} item={item} />
      ))}

      <MyPagePointCard2 />
    </div>
  );
};

export default PointHistory;
