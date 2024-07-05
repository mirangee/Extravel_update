import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../../../../scss/ExchangeHistory.module.scss';
import MyPageCard from './MyPageCard';
import AuthContext from '../../../../utils/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/host-config';
import { Button } from 'reactstrap';

const ExchangeHistory = () => {
  const { id } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
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
          API_BASE_URL + '/api/v2/exchange/' + id,
        );
        setHistory(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // 비동기 함수 호출
    fetchData();
    console.log('history의 길이: ', history.length);
    if (history.length === 0) {
      setHasList(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h3 className={styles.myExchangeHeader}>
        Exchange History{' '}
      </h3>
      {!hasList ? (
        <div className={styles.noList}>
          환전 내역이 없습니다
        </div>
      ) : (
        history
          .slice(0, visibleParagraphs)
          .map((item, key) => (
            <MyPageCard key={key} item={item} />
          ))
      )}
      {visibleParagraphs < history.length && (
        <Button
          className={styles.viewMore}
          onClick={showMore}
        >
          환전 내역 더 보기
        </Button>
      )}
    </>
  );
};

export default ExchangeHistory;
