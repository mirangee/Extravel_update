import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 다른 나라의 이미지도 같은 방식으로 import 합니다.

const countries = [
  {
    name: 'USA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl:
      'https://images-ext-1.discordapp.net/external/KpbnAh7zOI7Bt793FppLAb4fVT164XaRBF7sEmIYYNQ/https/flagcdn.com/w320/us.png?format=webp&quality=lossless',
  },
  {
    name: 'FRA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/fr.png',
  },
  {
    name: 'CHI',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/cn.png',
  },
  {
    name: 'ENG',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/gb.png',
  },
  {
    name: 'USA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl:
      'https://images-ext-1.discordapp.net/external/KpbnAh7zOI7Bt793FppLAb4fVT164XaRBF7sEmIYYNQ/https/flagcdn.com/w320/us.png?format=webp&quality=lossless',
  },
  {
    name: 'FRA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/fr.png',
  },
  {
    name: 'CHI',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/cn.png',
  },
  {
    name: 'ENG',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/gb.png',
  },
  {
    name: 'USA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl:
      'https://images-ext-1.discordapp.net/external/KpbnAh7zOI7Bt793FppLAb4fVT164XaRBF7sEmIYYNQ/https/flagcdn.com/w320/us.png?format=webp&quality=lossless',
  },
  {
    name: 'FRA',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/fr.png',
  },
  {
    name: 'CHI',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/cn.png',
  },
  {
    name: 'ENG',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/gb.png',
  },
  {
    name: 'CHI',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/cn.png',
  },
  {
    name: 'ENG',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/gb.png',
  },
  {
    name: 'CHI',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/cn.png',
  },
  {
    name: 'ENG',
    currency: '$',
    exchangeRate: '11.00',
    fluctuation: '0.5%',
    imageUrl: 'https://flagcdn.com/w320/gb.png',
  },

  // 나머지 21개 나라의 데이터를 추가합니다.
];

const CountryComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 4;

  // 현재 페이지에 해당하는 나라 데이터를 가져옵니다.
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry =
    indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry,
  );

  const totalPages = Math.ceil(
    countries.length / countriesPerPage,
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        style={{
          width: '500px',
          height: '500px',
          marginTop: ' 300px',
          marginLeft: '100px',
          borderRadius: '20px',
          boxShadow: 'lightgray 10px 5px 5px',
        }}
      >
        <div>
          <div style={{ paddingTop: '5px' }}>
            {currentCountries.map((country, index) => (
              <motion.div
                key={index}
                className='country'
                style={{
                  display: 'flex',
                  paddingTop: '15px',
                  paddingLeft: '40px',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.img
                  src={country.imageUrl}
                  alt={`${country.name} flag`}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50px',
                    marginTop: '15px',
                  }}
                  whileHover={{ scale: 1.2 }}
                />
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    paddingLeft: '30px',
                    paddingTop: '26px',
                  }}
                >
                  {country.name}
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    paddingTop: '24px',
                    marginRight: '100px',
                  }}
                >
                  {country.currency}
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    // fontWeight: 'bold',
                    paddingLeft: '10px',
                    paddingTop: '28px',
                  }}
                >
                  {country.exchangeRate}
                </div>
                <div
                  style={{
                    // background: 'red',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    padding: '5px',
                    margin: '20px',
                    // color: 'white',
                  }}
                >
                  {country.fluctuation}
                </div>
              </motion.div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => handleClick(page)}
                style={{
                  width: '30px',
                  height: '30px',
                  margin: '20px 10px',
                  border: '1px solid lightgray',
                  borderRadius: '50%',
                  backgroundColor:
                    currentPage === page
                      ? '#275963'
                      : 'transparent',
                  color:
                    currentPage === page
                      ? '#fff'
                      : '#275963',
                  cursor: 'pointer',
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryComponent;
