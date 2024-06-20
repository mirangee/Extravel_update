import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from '../../../scss/Section2.module.scss'; // 스타일을 위한 SCSS 파일 import
import axios from 'axios';
import LiveRankExRateCard from './LiveRankExRateCard';
import '../../../scss/SwiperCustom.css';

const Section2 = () => {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const getLiveData = async () => {
      await axios
        .get('http://localhost:8181/api/rate/currency/live')
        .then((res) => {
          setLiveData(res.data);
          setLoading(true);
          if (
            swiperRef.current &&
            swiperRef.current.swiper
          ) {
            swiperRef.current.swiper.autoplay.start();
          }
        });
    };

    getLiveData();
  }, []);

  return (
    <>
      <div className={styles.section2}>
        <div className={styles.section2Box}>
          <div className={styles.section2Wrapper}>
            <div className={styles.section2Title}>
              <h1>실시간 환율 정보를 확인하세요</h1>
            </div>
            <div className={styles.section2Container}>
              {loading && (
                <Swiper
                  ref={swiperRef}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false, // 사용자 상호작용 후에도 autoplay 유지
                  }}
                  loop={true}
                  speed={6000}
                  spaceBetween={50}
                  slidesPerView={'auto'}
                  observer={true}
                  style={{ width: '100%', height: '170px' }} // Swiper 컨테이너 크기 설정
                >
                  {liveData.map((item) => (
                    <SwiperSlide
                      key={item.id}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow:
                          '0 0px 3px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22)',
                      }}
                    >
                      <LiveRankExRateCard item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
          <div className={styles.section2Box2}>
            <div className={styles.searchTableBox}></div>
            <div className={styles.searchTextBox}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
