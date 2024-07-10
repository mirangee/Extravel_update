import React, { useEffect, useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from '../../../scss/Section2.module.scss'; // 스타일을 위한 SCSS 파일 import
import axios from 'axios';
import LiveRankExRateCard from './LiveRankExRateCard';
import '../../../scss/SwiperCustom.css';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme } from '@mui/material/styles';
import VirualEx from './VirualEx';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './../../../config/host-config';

const Section2 = () => {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const getLiveData = async () => {
      await axios
        .get(`${API_BASE_URL}/api/rate/currency/live`)
        .then((res) => {
          setLiveData(res.data);
          setLoading(true);
        });
    };

    getLiveData();
  }, []);

  return (
    <>
      <div className={styles.section2}>
        <div className={styles.section2Box}>
          <div className={styles.titleBox}>
            <h1>실시간 환율을 확인하세요</h1>
            <span>
              {' '}
              22개의 국가 환율을 확인하고, 원화가 강세인
              여행지를 추천받으세요{' '}
            </span>
            <div className={styles.titleBt}>
              <Button
                onClick={goToLogin}
                startIcon={<ArrowForwardIcon />}
                variant='contained'
                style={{
                  backgroundColor: '#275963',
                  borderRadius: '10px',
                }}
              >
                더 많은 국가 보기
              </Button>
            </div>
          </div>
          <div className={styles.rateContent}>
            <div className={styles.downRate}>
              {liveData.splice(0, 3).map((data) => (
                <LiveRankExRateCard
                  item={data}
                  key={data.id}
                />
              ))}
            </div>
            <div className={styles.upRate}>
              {liveData
                .reverse()
                .splice(0, 3)
                .map((data) => (
                  <LiveRankExRateCard
                    item={data}
                    key={data.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
