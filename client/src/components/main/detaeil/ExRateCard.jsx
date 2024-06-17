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

const ExRateCard = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date(),
  );
  const [exchangeRate, setExchangeRate] = useState({
    country: '한국',
    rate: '1,200 원',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    boxShadow:
      '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    width: '400px',
    marginTop: '70px',
    borderRadius: '10px',
  };

  const noBorderStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  const rowStyle = {
    justifyContent: 'left',
  };

  const textCenterStyle = {};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(
      2,
      '0',
    );
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(
      2,
      '0',
    );
    const seconds = String(date.getSeconds()).padStart(
      2,
      '0',
    );
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
            현재 환율
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
                  fontSize: '36px',
                  width: '600px',
                  height: '20px',
                }}
              >
                {exchangeRate.rate}
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
              }}
            >
              <CardText>{formatDate(currentTime)}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExRateCard;
