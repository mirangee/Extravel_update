import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const newsData = [
  {
    title: '첫 번째 뉴스 제목',
    text: '첫 번째 뉴스의 간단한 설명입니다. 더 자세한 내용을 보려면 클릭하세요.',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const News = () => {
  return (
    <Row>
      {newsData.map((news, index) => (
        <Col sm='6' key={index}>
          <Card
            style={{
              width: '300px',
              border: 'none',
            }}
          >
            <CardImg
              top
              src={news.imageUrl}
              alt='뉴스 이미지'
              style={{
                width: '300px',
                height: '200px',
                objectFit: 'cover',
                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0)',
              }}
            />
            <CardBody
              style={{
                height: '165px',
                paddingTop: '25px',
              }}
            >
              <CardTitle tag='h5'>{news.title} </CardTitle>
              <CardText style={{ paddingTop: '10px' }}>
                {news.text}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
