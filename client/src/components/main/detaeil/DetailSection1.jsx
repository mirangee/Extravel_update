import React from 'react';
import Styles from '../../../scss/DetailSection1.module.scss';
import ShowChart from './ShowChart';
import NaverNews from '../../user/NaverNews';
const DetailSection1 = () => {
  return (
    <div className={Styles.box}>
      <ShowChart />
      <NaverNews />
    </div>
  );
};

export default DetailSection1;
