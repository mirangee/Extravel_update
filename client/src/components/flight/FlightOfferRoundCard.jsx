import React, { useState } from 'react';
import Styles from '../../scss/FlightOfferRoundCard.module.scss';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { AirLineList } from './AirLineList';
const FlightOffterRoundCard = ({ item }) => {
  const { itineraries, numberOfBookableSeats, price } =
    item;
  const { segments, duration } = itineraries[0];

  const { segments: segments2, duration: duration2 } =
    itineraries[1];
  const uniqueAirLine = [
    ...new Set(
      segments.map((item) =>
        item.operating
          ? item.operating.carrierCode
          : item.carrierCode,
      ),
    ),
  ];
  const uniqueAirLine2 = [
    ...new Set(
      segments2.map((item) =>
        item.operating
          ? item.operating.carrierCode
          : item.carrierCode,
      ),
    ),
  ];
  const caltime = () => {
    return duration
      .replace('PT', '')
      .replace('H', '시간')
      .replace('M', '분');
  };
  const caltime2 = () => {
    return duration2
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
  const calDirect2 = () => {
    const isDirect =
      segments2.length - 1 > 0
        ? `경유 ${segments2.length - 1}, `
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
    <div className={Styles.box}>
      <div className={Styles.mainContainer}>
        <div className={Styles.container}>
          <div className={Styles.direct}>가는편</div>
          <div className={Styles.airline}>
            {uniqueAirLine.map((carrierCode, index) => (
              <div
                key={index}
                className={Styles.airlineText}
              >
                {AirLineList[carrierCode] && (
                  <img src={AirLineList[carrierCode].img} />
                )}
                {AirLineList[carrierCode]
                  ? AirLineList[carrierCode].title
                  : carrierCode}
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
        </div>
        <div className={Styles.container}>
          <div className={Styles.direct}>오는편</div>
          <div className={Styles.airline}>
            {uniqueAirLine2.map((carrierCode, index) => (
              <div
                key={index}
                className={Styles.airlineText}
              >
                {AirLineList[carrierCode] && (
                  <img src={AirLineList[carrierCode].img} />
                )}
                {AirLineList[carrierCode]
                  ? AirLineList[carrierCode].title
                  : carrierCode}
              </div>
            ))}
          </div>
          <div className={Styles.timeInfo}>
            {segments2.map((item) => (
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
            {calDirect2()}
            {caltime2()}
          </div>
        </div>
      </div>
      <div>
        <div className={Styles.offerinfo}>
          <div>
            예약 가능한 좌석 : {numberOfBookableSeats}/9
          </div>
          <div className={Styles.price}>{calPrice()}원</div>
        </div>
      </div>
    </div>
  );
};

export default FlightOffterRoundCard;
