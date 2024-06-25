import React, { useEffect, useRef, useState } from 'react';
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
import { CiPlay1, CiPause1 } from 'react-icons/ci';

const NaverShopping = () => {
  const [article, setArticle] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 9;
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8181/api/v1/shopping')
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;

        const transformArticle = items.map((item) => ({
          title: item.title.replace(/(<([^>]+)>)/gi, ''),
          link: item.link,
          image: item.image,
          lprice: item.lprice,
        }));
        setArticle(transformArticle);
      })
      .catch((error) =>
        console.error('Error fetching data : ', error),
      );
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastArticle = activePage * itemsPerPage;
  const indexOfFirstArticle =
    indexOfLastArticle - itemsPerPage;
  const currentArticles = article.slice(
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
      <div className={styles.shoppingHeader}>
        <div className={styles.headerBox}>
          <Swiper
            ref={swiperRef}
            className={styles.swiperBox}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[
              Navigation,
              Autoplay,
              SwiperPagination,
            ]}
          >
            <a href='https://m.hanatour.com/dcr/'>
              <SwiperSlide>Slide 1</SwiperSlide>
            </a>
            <SwiperSlide>
              <a href=''></a>Slide 2
            </SwiperSlide>
            <SwiperSlide>
              <a href=''></a>Slide 3
            </SwiperSlide>
            <SwiperSlide>
              <a href=''></a>Slide 4
            </SwiperSlide>
            <SwiperSlide>
              <a href=''></a>Slide 5
            </SwiperSlide>
          </Swiper>
          <button
            onClick={handleAutoplayToggle}
            className={styles.autoplayToggle}
          >
            {isPlaying ? <CiPause1 /> : <CiPlay1 />}
          </button>
        </div>
      </div>
      <div className={styles.naverShoppingBox}>
        <ul className={styles.listUl}>
          {currentArticles.map((item, index) => (
            <li key={index}>
              <div className={styles.itemTitleContainer}>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img src={item.image} alt={item.title} />
                  <div className={styles.itemTitle}>
                    <h3>{item.title}</h3>
                    <p>{item.lprice.replace(/,/g, '')}원</p>
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.pagination}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={article.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
            activeClass='active'
            disabledClass='disabled'
            hideDisabled='false'
          />
        </div>
      </div>
    </>
  );
};

export default NaverShopping;
