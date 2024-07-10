import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '../../scss/NaverShopping.module.scss';
import Pagination from 'react-js-pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import {
  Navigation,
  Autoplay,
  Pagination as SwiperPagination,
} from 'swiper/modules';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import AuthContext from '../../utils/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config/host-config';

const NaverShopping = () => {
  const [article, setArticle] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const swiperRef = useRef(null);
  const { nation } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/shopping/${nation}`)
      .then((response) => {
        const items = response.data.items;

        const transformArticle = items.map((item) => ({
          title: item.title.replace(/(<([^>]+)>)/gi, ''),
          link: item.link,
          image: item.image,
          lprice: item.lprice,
        }));
        setArticle(transformArticle);
      })
      .catch((error) => {
        console.error('Error fetching data : ', error);
      });
  }, [nation]);

  const formatPrice = (lprice) => {
    return new Intl.NumberFormat('ko-KR').format(lprice);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo({
      top: 800,
      behavior: 'smooth',
    });
  };

  const indexOfLastArticle = activePage * itemsPerPage; // 1 * 12
  const indexOfFirstArticle =
    indexOfLastArticle - itemsPerPage;
  const currentArticles = article.slice(
    // 1에서 12로 끊어진다
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const handleAutoplayToggle = () => {
    const swiperInstance =
      swiperRef.current && swiperRef.current.swiper;
    if (swiperInstance) {
      if (isPlaying) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* -------------------------- 패키지 페이지의 Header 시작----------------------------- */}
      <div className={styles.shoppingHeader}>
        <div className={styles.topFive}>
          Top 5 추천 패키지
        </div>
        <div className={styles.headerBox}>
          <Swiper
            ref={swiperRef}
            className={styles.swiperBox}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={false}
            modules={[
              Navigation,
              Autoplay,
              SwiperPagination,
            ]}
          >
            {/* ----------------------------header swiperSlide 시작--------------------------------- */}
            {article.slice(0, 5).map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.swiperSlide}>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className={styles.slideContent}>
                      <img
                        src={item.image}
                        alt={item.title}
                      />
                      <div className={styles.overlay}>
                        <h3>{item.title}</h3>
                      </div>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleAutoplayToggle}
            className={styles.autoplayToggle}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
      {/* -------------------------- 패키지 페이지의 Header 끝----------------------------- */}
      <div className={styles.naverShoppingBox}>
        <ul className={styles.listUl}>
          {currentArticles.map((item, index) => (
            <li key={index}>
              <motion.div
                className={styles.itemTitleContainer}
                initial={{ y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  ease: 'easeInOut',
                  duration: 2,
                  y: { duration: 0.66 },
                }}
              >
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img src={item.image} alt={item.title} />
                  <div className={styles.itemTitle}>
                    <div>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{formatPrice(item.lprice)}원</p>
                  </div>
                </a>
              </motion.div>
            </li>
          ))}
        </ul>

        {/* ----------------------------------pagination--------------------------------- */}
        <div className={styles.pagination}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={article.length} //
            pageRangeDisplayed={5} //보여지는 버튼수
            onChange={handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
            activeClass='active'
            disabledClass='disabled'
            hideDisabled={false}
          />
        </div>
      </div>
    </>
  );
};

export default NaverShopping;
