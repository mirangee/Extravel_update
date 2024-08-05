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
import { Button } from 'reactstrap';

const PointHistory = () => {
  const { id, redirect } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [currentEtp, setCurrentEtp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasList, setHasList] = useState(true);
  const [visibleParagraphs, setVisibleParagraphs] =
    useState(3);

  const showMore = () => {
    setVisibleParagraphs((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
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
  }, [id, redirect]);

  useEffect(() => {
    if (history.length === 0) {
      setHasList(false);
    } else {
      setHasList(true);
    }
  }, [history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.title}>
        {' '}
        <h1 className={styles.pageHeader}>ETP history</h1>
        <p>
          {' '}
          보유 포인트 &nbsp;&nbsp;
          {currentEtp.toLocaleString('ko-KR')}P
        </p>
      </div>

      {!hasList ? (
        <div className={styles.noList}>
          충전 내역이 없습니다
        </div>
      ) : (
        history
          .slice(0, visibleParagraphs)
          .map((item) =>
            item.status === 'USED' ? (
              <MyPagePointCard2
                key={item.key}
                item={item}
              />
            ) : (
              <MyPagePointCard key={item.key} item={item} />
            ),
          )
      )}

      {visibleParagraphs < history.length && (
        <Button
          className={styles.viewMore}
          onClick={showMore}
        >
          충전 내역 더 보기
        </Button>
      )}
    </div>
  );
};

export default PointHistory;
