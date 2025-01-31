import React from 'react';
import Styles from '../../../scss/MainDetail.module.scss';
import DetailSection1 from './DetailSection1';
import DetailSection2 from './DetailSection2';
import DetailSection3 from './DetailSection3';
import YoutubeList from './YoutubeList';
const MainDetail = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  return (
    <div className={Styles.mainBox}>
      <DetailSection1 />
      <DetailSection2 />
      <DetailSection3 />
      <YoutubeList />
    </div>
  );
};

export default MainDetail;
