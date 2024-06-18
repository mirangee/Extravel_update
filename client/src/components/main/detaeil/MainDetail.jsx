import React from 'react';
import Styles from '../../../scss/MainDetail.module.scss';
import DetailSection1 from './DetailSection1';
import ExChangeRate from './ExRateCard';
import DetailSection2 from './DetailSection2';
import DetailSection3 from './DetailSection3';
const MainDetail = () => {
  return (
    <div className={Styles.mainBox}>
      <DetailSection1 />
      <DetailSection2 />
      <DetailSection3 />
    </div>
  );
};

export default MainDetail;
