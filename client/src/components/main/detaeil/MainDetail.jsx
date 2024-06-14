import React from 'react';
import Styles from '../../../scss/MainDetail.module.scss';
import DetailSection1 from './DetailSection1';
const MainDetail = () => {
  return (
    <div className={Styles.mainBox}>
      <DetailSection1 />
    </div>
  );
};

export default MainDetail;
