import React, { useEffect, useState } from 'react';
import { Table, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyRatesTable = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const generateRates = () => {
      const countries = [
        'USA',
        'Japan',
        'China',
        'Germany',
        'UK',
        'France',
        'India',
        'Brazil',
        'Canada',
        'Russia',
        'Australia',
        'Mexico',
        'Italy',
        'South Korea',
        'Spain',
        'Indonesia',
        'Turkey',
        'Saudi Arabia',
        'Switzerland',
        'Argentina',
        'Netherlands',
        'Sweden',
      ];

      const ratesData = countries.map((country, index) => ({
        rank: index + 1,
        country,
        changeFromPrev: (Math.random() * 10 - 5).toFixed(2),
        currentRate: (1100 + Math.random() * 100).toFixed(
          2,
        ),
        travelSearchRank:
          Math.floor(Math.random() * 100) + 1,
      }));

      setRates(ratesData);
    };

    generateRates();
  }, []);

  const getChangeColor = (change) => {
    if (change > 0) {
      return 'text-danger'; // 빨간색
    } else if (change < 0) {
      return 'text-primary'; // 파란색
    } else {
      return ''; // 기본색 (없음)
    }
  };

  const getChangeFromPrevText = (change) => {
    const formattedChange = parseFloat(change).toFixed(2);
    if (formattedChange > 0) {
      return `▲ ${formattedChange}`;
    } else if (formattedChange < 0) {
      return `▼ ${formattedChange}`;
    } else {
      return formattedChange;
    }
  };

  return (
    <Container style={{ marginLeft: '50px' }}>
      <h1
        style={{
          marginTop: '300px',
          marginLeft: '300px',
          marginBottom: '30px',
          color: '#14505c',
          fontSize: '36px',
          fontWeight: 'bold',
        }}
      >
        일별시세
      </h1>
      <Table
        hover
        style={{ width: '1400px', marginLeft: '300px' }}
      >
        <thead>
          <tr
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              borderBottom: '3px solid black',
            }}
          >
            <th>순위</th>
            <th>국가명</th>
            <th>등락률</th>
            <th>현재환율</th>
            <th>여행검색순위</th>
          </tr>
        </thead>
        <tbody
          style={{ fontSize: '15px', fontWeight: '400' }}
        >
          {rates.map((rate) => (
            <tr key={rate.rank}>
              <td>{rate.rank}</td>
              <td>{rate.country}</td>
              <td
                className={getChangeColor(
                  rate.changeFromPrev,
                )}
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {getChangeFromPrevText(rate.changeFromPrev)}
              </td>
              <td
                style={{
                  backgroundColor:
                    rate.changeFromPrev > 0
                      ? '#ffe6e6'
                      : rate.changeFromPrev < 0
                        ? '#e6f7ff'
                        : 'transparent',
                  fontWeight: 'bold',
                  color: getChangeColor(
                    rate.changeFromPrev,
                  ),
                  fontSize: '20px',
                }}
              >
                {rate.currentRate}
              </td>
              <td>{rate.travelSearchRank}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DailyRatesTable;
