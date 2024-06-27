import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'; // Swiper의 기본 CSS를 가져옵니다.
import 'swiper/css/navigation'; // Swiper의 Navigation CSS를 가져옵니다.
import 'swiper/css/pagination'; // Swiper의 Pagination CSS를 가져옵니다.
import styles from '../../../scss/YoutubeList.module.scss';
const YoutubeList = () => {
  return (
    <>
      <div className={styles.youtubeContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={5}
          slidesPerView={3} // 한 번에 보여질 슬라이드 수
          navigation={true} // 네비게이션 활성화
          pagination={{ clickable: true }} // 페이지네이션 활성화
          freeMode={false} // 무한 루프 설정
        >
          <div className='youtubeSlider'>
            <SwiperSlide>
              <iframe
                className='youtube1'
                width='500'
                height='280'
                src='https://www.youtube.com/embed/IRG-MEF_IDY'
                title='YouTube video 1'
                style={{ marginLeft: '75px' }}
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className='youtube2'
                width='500'
                height='280'
                src='https://www.youtube.com/embed/snW9W3rjeos'
                title='YouTube video 2'
                style={{ marginLeft: '50px' }}
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className='youtube3'
                width='500'
                height='280'
                src='https://www.youtube.com/embed/ktu5LeQgDrE'
                title='YouTube video 3'
                style={{ marginLeft: '50px' }}
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className='youtube1'
                width='500'
                height='280'
                src='https://www.youtube.com/embed/IRG-MEF_IDY'
                title='YouTube video 1'
                style={{ marginLeft: '50px' }}
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                className='youtube3'
                width='500'
                height='280'
                src='https://www.youtube.com/embed/ktu5LeQgDrE'
                title='YouTube video 3'
                style={{ marginLeft: '50px' }}
              ></iframe>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default YoutubeList;
