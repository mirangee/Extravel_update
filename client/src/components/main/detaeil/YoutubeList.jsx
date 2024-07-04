import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'; // Swiper의 기본 CSS를 가져옵니다.
import 'swiper/css/navigation'; // Swiper의 Navigation CSS를 가져옵니다.
import 'swiper/css/pagination'; // Swiper의 Pagination CSS를 가져옵니다.
import styles from '../../../scss/YoutubeList.module.scss';
import AuthContext from '../../../utils/AuthContext';
import axios from 'axios';
const YoutubeList = () => {
  const { nation } = useContext(AuthContext);
  const [youtubeLink, setYoutubeLink] = useState([]);
  useEffect(() => {
    console.log('유튜브페이지국가:{}', nation);

    if (nation) {
      console.log('if nation:{}', nation);
      axios //get요청보내기
        .get(
          `http://localhost:8181/api/v1/youtube/` + nation,
        )
        .then((response) => {
          setYoutubeLink(response.data);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  }, [nation]);

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
          <div className={styles.youtubeSlider}>
            {youtubeLink.map((item) => (
              <SwiperSlide>
                <iframe
                  className={styles.youtube1}
                  width='500'
                  height='280'
                  title='YouTube video 1'
                  src={item.youtubeVideoLink}
                  style={{ marginLeft: '75px' }}
                ></iframe>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default YoutubeList;
