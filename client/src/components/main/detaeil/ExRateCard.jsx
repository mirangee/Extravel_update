import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const ExRateCard = ({ exChanges, type }) => {
  const title = () => {
    if (type === 'cur') {
      return <div>현재 환율</div>;
    } else if (type === 'week') {
      return <div>일주일 환율 증감율</div>;
    } else if (type === 'month') {
      return <div>한달 환율 증감율</div>;
    }
  };
  const exRate = () => {
    if (type === 'cur') {
      let cal =
        exChanges.lastestCurEx - exChanges.lastestPreCurEx;
      let percent = 0;
      if (cal > 0) {
        percent = (cal / exChanges.lastestPreCurEx) * 100;

        return (
          <div style={{ color: 'red', marginTop: '5px' }}>
            ▲ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else if (cal < 0) {
        percent = (cal / exChanges.lastestCurEx) * 100;
        return (
          <div style={{ color: 'blue', marginTop: '5px' }}>
            ▼ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else {
        return (
          <div style={{ color: 'gray', marginTop: '5px' }}>
            -- 0.0 {percent}%
          </div>
        );
      }
    } else if (type === 'week') {
      let cal =
        exChanges.lastestCurEx -
        exChanges.lastestWeekAverEx;
      let percent = 0;
      if (cal > 0) {
        percent = (cal / exChanges.lastestCurEx) * 100;
        return (
          <div style={{ color: 'red' }}>
            ▲ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else if (cal < 0) {
        percent = (cal / exChanges.lastestWeekAverEx) * 100;
        return (
          <div style={{ color: 'blue' }}>
            ▼ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else {
        return (
          <div style={{ color: 'gray' }}>
            -- 0.0 {percent}%
          </div>
        );
      }
    } else if (type === 'month') {
      let cal =
        exChanges.lastestCurEx -
        exChanges.lastestMonthAverEx;

      let percent = 0;
      if (cal > 0) {
        percent = (cal / exChanges.lastestCurEx) * 100;
        return (
          <div style={{ color: 'red' }}>
            ▲ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else if (cal < 0) {
        percent =
          (cal / exChanges.lastestMonthAverEx) * 100;
        return (
          <div style={{ color: 'blue' }}>
            ▼ {Math.abs(cal).toFixed(2)}{' '}
            {percent.toFixed(2)}%
          </div>
        );
      } else {
        return (
          <div style={{ color: 'gray' }}>
            -- 0.0 {percent}%
          </div>
        );
      }
    }
  };

  const [count, setCount] = useState(0);
  const target = exChanges.lastestCurEx;
  const increment = 18;

  useEffect(() => {
    const counting = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= target) {
          clearInterval(counting);
          return target;
        } else {
          return prevCount + increment;
        }
      });
    }, 20);

    return () => clearInterval(counting); // Clean up the interval on component unmount
  }, [target, increment]);

  const containerStyle = {
    boxShadow:
      '0 0px 3px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22)',
    width: '400px',
    marginTop: '70px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
  };

  const noBorderStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  const rowStyle = {
    justifyContent: 'left',
  };

  const textCenterStyle = {};

  const formatDate = () => {
    let date = '';
    if (type === 'cur') {
      date = exChanges.lastestCurDate;
      return <div>{date} 기준 </div>;
    } else if (type === 'week') {
      date =
        exChanges.lastestWeekDate +
        ' ~ ' +
        exChanges.lastestWeekEndDate;
      return <div>{date}</div>;
    } else if (type === 'month') {
      date =
        exChanges.lastestMonthDate +
        ' ~ ' +
        exChanges.lastestMonthEndDate;
      return <div>{date}</div>;
    }
  };

  return (
    <Container style={containerStyle}>
      <Row style={rowStyle}>
        <Col sm='12' style={textCenterStyle}>
          <h2
            style={{
              paddingTop: '20px',
              paddingLeft: '15px',
              fontWeight: 'bold',
              fontSize: '19px',
            }}
          >
            {title()}
          </h2>
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col sm='6'>
          <Card style={noBorderStyle}>
            <CardBody>
              <CardTitle
                tag='h5'
                style={{
                  fontWeight: 'bold',
                  fontSize:
                    type === 'cur' ? '19px' : '30px',
                  width: '600px',
                  height: '20px',
                  display: 'flex',
                }}
              >
                {type === 'cur' ? (
                  <div
                    style={{
                      marginRight: '20px',
                      fontSize: '30px',
                    }}
                  >
                    {new Intl.NumberFormat().format(count)}{' '}
                    원
                  </div>
                ) : (
                  ''
                )}
                {exRate()}
              </CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col sm='6' style={textCenterStyle}>
          <Card style={noBorderStyle}>
            <CardBody
              style={{
                paddingRight: '20px',
                width: '600px',
                color: 'gray',
              }}
            >
              <CardText>{formatDate()}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExRateCard;
