import React, { useEffect, useState } from 'react';
import { Table, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyRatesTable = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
      }
      return dates;
    };

    /* 이건 그냥 불러오는 값넣으면 되는데 형식 보려고 랜덤으로 돌린거임 나중에 지울수도 */
    const generateRates = () => {
      const dates = generateDates();
      const ratesData = dates.map((date) => ({
        date: date.toLocaleDateString(),
        baseRate: (1100 + Math.random() * 100).toFixed(2),
        changeFromPrev: (Math.random() * 10 - 5).toFixed(2),
        fluctuationRate: (Math.random() * 2 - 1).toFixed(2),
        cashBuy: (1100 + Math.random() * 100).toFixed(2),
        cashSell: (1100 + Math.random() * 100).toFixed(2),
        remittanceSend: (
          1100 +
          Math.random() * 100
        ).toFixed(2),
        remittanceReceive: (
          1100 +
          Math.random() * 100
        ).toFixed(2),
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
    <Container
      style={{
        marginLeft: '50px',
        // border: '1px solid black',
      }}
    >
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
            <th>날짜</th>
            <th>매매기준율</th>
            <th>전일대비</th>
            <th>등락률</th>
            <th>현찰 살때</th>
            <th>현찰 팔때</th>
            <th>송금할때</th>
            <th>송금 받을 때</th>
          </tr>
        </thead>
        <tbody
          style={{ fontSize: '15px', fontWeight: '400' }}
        >
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.date}</td>
              <td>{rate.baseRate}</td>
              <td
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
                className={getChangeColor(
                  rate.changeFromPrev,
                )}
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
                {rate.fluctuationRate}
              </td>
              <td>{rate.cashBuy}</td>
              <td>{rate.cashSell}</td>
              <td>{rate.remittanceSend}</td>
              <td>{rate.remittanceReceive}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DailyRatesTable;
