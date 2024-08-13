import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  EffectCoverflow,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '../../../scss/YoutubeList.module.scss';
import AuthContext from '../../../utils/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';

const YoutubeList = () => {
  const { nation } = useContext(AuthContext);
  const [youtubeLink, setYoutubeLink] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (nation) {
      axios //get요청보내기
        .get(`${API_BASE_URL}/api/v1/youtube/` + nation)
        .then((response) => {
          setYoutubeLink(response.data);
          if (swiperRef.current) {
            swiperRef.current.swiper.update(); // Swiper 업데이트
          }
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  }, [nation]);

  return (
    <>
      {youtubeLink && youtubeLink.length > 1 && (
        <div className={styles.youtubeContainer}>
          <Swiper
            effect={'coverflow'}
            modules={[
              Navigation,
              Pagination,
              EffectCoverflow,
            ]}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 3,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            centeredSlides={true}
            slidesPerView={3}
            initialSlide={1}
            loop={true}
            className='swiper'
            ref={swiperRef} // Swiper 인스턴스를 참조
          >
            {youtubeLink.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{ width: '500px' }}
              >
                <iframe
                  width='500'
                  height='280'
                  title={`YouTube video ${index + 1}`}
                  src={item.youtubeVideoLink}
                ></iframe>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default YoutubeList;
