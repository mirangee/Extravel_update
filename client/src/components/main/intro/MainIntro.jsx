import React from 'react';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import LiveRankExRateCard from './LiveRankExRateCard';
import PopularTravelContry from '../detaeil/PopularTravelContry';
import Phone from '../detaeil/Phone';

const MainIntro = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Phone />
      {/* <PopularTravelContry /> */}
      <Section3 />
    </>
  );
};

export default MainIntro;
