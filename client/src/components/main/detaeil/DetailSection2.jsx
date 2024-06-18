import React, { useEffect, useState } from 'react';
import ExRateCard from './ExRateCard';
import Styles from '../../../scss/DetailSection2.module.scss';
import axios from 'axios';
const DetailSection2 = () => {
  const nation = 'US'; // useContext()로 설정국가 가져올거;
  const [exChanges, setExChanges] = useState('');
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:8181/api/rate/currency?nation=${nation}`,
      );
      setExChanges(response.data);
    };
    getData();
  }, []);

  return (
    <div className={Styles.box}>
      <ExRateCard exChanges={exChanges} type='cur' />
      <ExRateCard exChanges={exChanges} type='week' />
      <ExRateCard exChanges={exChanges} type='month' />
    </div>
  );
};

export default DetailSection2;
