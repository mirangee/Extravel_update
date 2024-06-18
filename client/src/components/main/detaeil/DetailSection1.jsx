import React from 'react';
import Styles from '../../../scss/DetailSection1.module.scss';
import ShowChart from './ShowChart';
import News from './News';
const DetailSection1 = () => {
  return (
    <div className={Styles.box}>
      <ShowChart />
      <News />
      <News />
    </div>
  );
};

export default DetailSection1;
