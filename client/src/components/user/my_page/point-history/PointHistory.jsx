import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import MyPagePointCard from './MyPagePointCard';
import MyPagePointCard2 from './MyPagePointCard2';
import styles from '../../../../scss/PointHistory.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/host-config';
import AuthContext from '../../../../utils/AuthContext';

const PointHistory = () => {
  const { id } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [currentEtp, setCurrentEtp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      console.log('가지고 있는 id 값:', id);
      try {
        const res = await axios.post(
          API_BASE_URL + '/history/point/' + id,
        );
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
        setCurrentEtp(response.data.etPoint);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    // 비동기 함수 호출
    fetchCurrentPoint();
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

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

      {history.map((item, key) =>
        item.status === 'USED' ? (
          <MyPagePointCard2 key={key} item={item} />
        ) : (
          <MyPagePointCard key={key} item={item} />
        ),
      )}
    </div>
  );
};

export default PointHistory;
