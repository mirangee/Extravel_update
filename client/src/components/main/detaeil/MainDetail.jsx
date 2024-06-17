import React from 'react';
import Styles from '../../../scss/MainDetail.module.scss';
import DetailSection1 from './DetailSection1';
import ExChangeRate from './ExRateCard';
import DetailSection2 from './DetailSection2';
const MainDetail = () => {
  return (
    <div className={Styles.mainBox}>
      <DetailSection1 />
      <DetailSection2 />
    </div>
  );
};

export default MainDetail;
