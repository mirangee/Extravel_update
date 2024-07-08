import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../../../../scss/Wallet.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/host-config';
import AuthContext from '../../../../utils/AuthContext';
import WalletCard from './WalletCard';

const Wallet = () => {
  const { id } = useContext(AuthContext);
  const [hasList, setHasList] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          API_BASE_URL + '/history/point/' + id,
        );
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }, []);
  return (
    <div>
      <div className={styles.title}>
        {' '}
        <h1 className={styles.pageHeader}>My Wallet</h1>
      </div>

      {!hasList ? (
        <div className={styles.noList}>
          보유 외화가 없습니다
        </div>
      ) : (
        <WalletCard />
      )}
    </div>
  );
};

export default Wallet;
