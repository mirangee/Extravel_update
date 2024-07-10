import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import ExRateCard from './ExRateCard';
import Styles from '../../../scss/DetailSection2.module.scss';
import axios from 'axios';
import AuthContext from '../../../utils/AuthContext';
import { API_BASE_URL } from '../../../config/host-config';
const DetailSection2 = () => {
  const [exChanges, setExChanges] = useState('');
  const { nation } = useContext(AuthContext);
  useEffect(() => {
    if (nation) {
      const getData = async () => {
        const response = await axios.get(
          `${API_BASE_URL}/api/rate/currency?nation=${nation}`,
        );
        setExChanges(response.data);
      };
      getData();
    }
  }, [nation]);

  return (
    <div className={Styles.box}>
      <ExRateCard exChanges={exChanges} type='cur' />
      <ExRateCard exChanges={exChanges} type='week' />
      <ExRateCard exChanges={exChanges} type='month' />
    </div>
  );
};

export default DetailSection2;
