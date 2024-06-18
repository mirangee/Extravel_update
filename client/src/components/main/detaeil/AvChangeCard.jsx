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

const AvChangeCard = () => {
  const containerStyle = {
    width: '800px',
    marginTop: '20px',
    boxShadow:
      '0 0px 3px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22)',
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

  return (
    <Container style={containerStyle}>
      <Row style={rowStyle}>
        <Col sm='12' style={textCenterStyle}>
          <h2
            style={{
              paddingTop: '25px',
              paddingLeft: '20px',
              fontWeight: 'bold',
              fontSize: '17px',
            }}
          >
            미국으로 떠나는 여행객은
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
                  fontSize: '30px',
                  width: '600px',
                  height: '20px',
                }}
              >
                평균{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '36px',
                  }}
                >
                  932,123
                </span>{' '}
                원 환전했어요.
              </CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col sm='6' style={textCenterStyle}>
          <Card style={noBorderStyle}>
            <CardBody>
              <CardText style={{ marginLeft: '5px' }}>
                2024/06/18 기준
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AvChangeCard;
