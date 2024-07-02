import React, { useState } from 'react';
import Styles from '../../scss/FlightOfferCard.module.scss';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { AirLineList } from './AirLineList';
const FlightOffterCard = ({ item }) => {
  const { itineraries, numberOfBookableSeats, price } =
    item;
  const { segments, duration } = itineraries[0];
  const uniqueAirLine = [
    ...new Set(
      segments.map((item) => item.operating.carrierCode),
    ),
  ];
  const caltime = () => {
    return duration
      .replace('PT', '')
      .replace('H', '시간')
      .replace('M', '분');
  };
  const calDirect = () => {
    const isDirect =
      segments.length - 1 > 0
        ? `경유 ${segments.length - 1}, `
        : '직항, ';
    return isDirect;
  };
  const calPrice = () => {
    let won = price.total.substring(
      0,
      price.total.indexOf('.'),
    );
    won = parseInt(won, 10);
    return won.toLocaleString('ko-KR');
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.airline}>
        {uniqueAirLine.map((carrierCode, index) => (
          <div key={index} className={Styles.airlineText}>
            {carrierCode}
          </div>
        ))}
      </div>
      <div className={Styles.timeInfo}>
        {segments.map((item) => (
          <div className={Styles.timeInfoText}>
            <p className={Styles.time}>
              {item.departure.at.substring(11, 16)}
            </p>
            <p className={Styles.code}>
              {item.departure.iataCode}
            </p>
            <FlightTakeoffIcon />
            <p className={Styles.time}>
              {item.arrival.at.substring(11, 16)}
            </p>
            <p className={Styles.code}>
              {' '}
              {item.arrival.iataCode}
            </p>
          </div>
        ))}
      </div>
      <div className={Styles.calTime}>
        {calDirect()}
        {caltime()}
      </div>
      <div className={Styles.offerinfo}>
        <div>
          예약 가능한 좌석 : {numberOfBookableSeats}/9
        </div>
        <div className={Styles.price}>{calPrice()} 원</div>
      </div>
    </div>
  );
};

export default FlightOffterCard;
