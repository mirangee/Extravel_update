import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
} from 'reactstrap';
import koreaFlag from '../../../assets/flags/korea.png';

const ExChangeRate = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date(),
  );
  const [exchangeRate, setExchangeRate] = useState({
    country: '한국',
    rate: '1,200 KRW',
  });
  const weeklyRate = {
    country: '한국',
    rate: '1,210 KRW',
  };

  const monthlyRate = {
    country: '한국',
    rate: '1,220 KRW',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    border: '1px solid black',
    borderRadius: '20px',
    width: '350px',
    marginTop: '80px',
    marginBottom: '40px',
    height: '90px',
    paddingLeft: '10px',
    // background: '#275963',
    // boxShadow: '#275963 10px 5px 5px',
  };

  const noBorderStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  const rowStyle = {
    justifyContent: 'left',
    width: '250px',
  };

  const textCenterStyle = {};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(
      2,
      '0',
    );
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} ${month} ${day}`;
  };

  return (
    <Container
      style={{
        textAlign: 'center',
        marginTop: '50px',
        // border: '1px solid black',
        width: '400px',
        borderRadius: '10px',
        boxShadow: 'lightgray 10px 5px 5px',
      }}
    >
      <CardImg
        top
        src='https://flagcdn.com/w320/us.png'
        alt='Korea flag'
        style={{
          marginBottom: '10px',
          marginTop: '30px',
          width: '300px',
          height: '200px',
          background: 'red',
          boxShadow: 'lightgray 10px 5px 5px',
        }}
      />
      <div
        style={{
          display: 'flex',
          textAlign: 'left',
          paddingBottom: '30px',
        }}
      >
        <Container
          style={{ ...containerStyle, marginRight: '20px' }}
        >
          <Row style={rowStyle}>
            <Col sm='12' style={textCenterStyle}>
              <h2
                style={{
                  paddingTop: '10px',
                  paddingLeft: '5px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                현재환율정보
              </h2>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col sm='6'>
              <Card style={noBorderStyle}>
                <h2
                  style={{
                    fontWeight: 'bold',
                    fontSize: '22px', // Adjusted font size
                    width: '250px',
                    height: '10px',
                    marginBottom: '20px',
                    marginTop: '10px',
                    marginLeft: '5px',
                  }}
                >
                  {' '}
                  {exchangeRate.country} {exchangeRate.rate}
                </h2>
              </Card>
            </Col>
          </Row>
          {/* <Row style={rowStyle}>
            <Col sm='6' style={textCenterStyle}>
              <Card style={noBorderStyle}>
                <CardBody
                  style={{
                    width: '100px',
                    fontSize: '12px',
                  }}
                >
                  <CardText>
                    {formatDate(currentTime)}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </div>
    </Container>
  );
};

export default ExChangeRate;
