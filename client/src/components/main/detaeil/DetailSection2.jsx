import React from 'react';
import ExRateCard from './ExRateCard';
import Styles from '../../../scss/DetailSection2.module.scss';

const DetailSection2 = () => {
  return (
    <div className={Styles.box}>
      <ExRateCard />
      <ExRateCard />
      <ExRateCard />
    </div>
  );
};

export default DetailSection2;
