import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../scss/Section2.scss'; // 스타일을 위한 SCSS 파일 import

const countries = [
  {
    name: 'United States',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    description:
      'The United States of America is a country primarily located in North America.',
  },
  {
    name: 'South Korea',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    description:
      'South Korea is a country in East Asia, known for its culture, technology, and cuisine.',
  },
  // 나머지 국가 정보들 추가
  {
    name: 'Canada',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
    description:
      'Canada is a country in North America, known for its vast landscapes and multicultural society.',
  },
  {
    name: 'Germany',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    description:
      'Germany is a country in Central Europe, known for its rich history, culture, and engineering.',
  },
  {
    name: 'United States',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    description:
      'The United States of America is a country primarily located in North America.',
  },
  {
    name: 'South Korea',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    description:
      'South Korea is a country in East Asia, known for its culture, technology, and cuisine.',
  },
  // 나머지 국가 정보들 추가
  {
    name: 'Canada',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
    description:
      'Canada is a country in North America, known for its vast landscapes and multicultural society.',
  },
  {
    name: 'Germany',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    description:
      'Germany is a country in Central Europe, known for its rich history, culture, and engineering.',
  },
  {
    name: 'United States',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    description:
      'The United States of America is a country primarily located in North America.',
  },
  {
    name: 'South Korea',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    description:
      'South Korea is a country in East Asia, known for its culture, technology, and cuisine.',
  },
  // 나머지 국가 정보들 추가
  {
    name: 'Canada',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
    description:
      'Canada is a country in North America, known for its vast landscapes and multicultural society.',
  },
  {
    name: 'Germany',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    description:
      'Germany is a country in Central Europe, known for its rich history, culture, and engineering.',
  },
  // 여기에 20개 나라 더 추가
];

const Section2 = () => {
  return (
    <>
      <h3 className='title'>각 나라의 환율 정보</h3>
      <div className='section2-container'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          freeMode={true}
          style={{ width: '1800px', height: '500px' }} // Swiper 컨테이너 크기 설정
        >
          {countries.map((country, index) => (
            <SwiperSlide key={index}>
              <div className='country-card'>
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className='flag'
                />
                <h3>{country.name}</h3>
                <p>{country.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Section2;
