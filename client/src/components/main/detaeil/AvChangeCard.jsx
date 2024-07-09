import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import AuthContext from '../../../utils/AuthContext';
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
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';

const AvChangeCard = () => {
  const [name, setName] = useState();
  const [sum, setSum] = useState(0.0);
  const { nation } = useContext(AuthContext);
  const date = new Date();
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat(
    'ko-KR',
    options,
  ).format(date);
  useEffect(() => {
    if (nation) {
      const getData = async () => {
        const response = await axios.get(
          `${API_BASE_URL}/api/v2/exchange/average?nation=${nation}`,
        );
        setName(response.data.name);
        setSum(response.data.sum);
      };
      getData();
    }
  }, [nation]);

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
            {name}으로 떠나는 여행객은
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
                누적{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '36px',
                  }}
                ></span>
                {Number(sum.toFixed(0)).toLocaleString(
                  'ko-KR',
                )}
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
                {formattedDate}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AvChangeCard;
