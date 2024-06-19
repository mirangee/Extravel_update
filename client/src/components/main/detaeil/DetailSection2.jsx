import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import ExRateCard from './ExRateCard';
import Styles from '../../../scss/DetailSection2.module.scss';
import axios from 'axios';
import AuthContext from '../../../utils/AuthContext';
const DetailSection2 = () => {
  const [exChanges, setExChanges] = useState('');
  const { nation } = useContext(AuthContext);
  useEffect(() => {
    if (nation) {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8181/api/rate/currency?nation=${nation}`,
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
