import React from 'react';
import styles from '../../../scss/Phone.module.scss';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Phone = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.phone}>
          <div className={styles.phoneBack}>
            <div className={styles.phoneLeftSide}>
              <div className={styles.phoneAntena}></div>
              <div
                className={`${styles.phoneButton} ${styles.top}`}
              ></div>
              <div className={styles.phoneButton}></div>
              <div
                className={`${styles.phoneButton} ${styles.bottom}`}
              ></div>
              <div
                className={`${styles.phoneAntena} ${styles.bottom}`}
              ></div>
            </div>
            <div className={styles.phoneBottom}>
              <div className={styles.phoneAntena}></div>
              <div className={styles.bottomSpeaker}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.phoneScrew}>
                <div></div>
              </div>
              <div className={styles.phoneCharger}></div>
              <div
                className={`${styles.phoneScrew} ${styles.right}`}
              >
                <div></div>
              </div>
              <div
                className={`${styles.bottomSpeaker} ${styles.right}`}
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div
                className={`${styles.phoneAntena} ${styles.right}`}
              ></div>
            </div>
          </div>
          <div className={styles.phoneScreen}></div>
          <div className={styles.phoneDisplay}>
            <div className={styles.phoneNotch}>
              <div className={styles.phoneSpeaker}></div>
            </div>
            <div className={styles.displayContent}>
              <div className={styles.notificationsBar}>
                <div className={styles.time}>07:27</div>
                <div className={styles.range}></div>
                <div className={styles.wifi}></div>
                <div className={styles.battery}></div>
              </div>
              <div className={styles.nav}>
                <div className={styles.messages}></div>
                <div className={styles.phoneNumber}>
                  Extravle 항공권
                </div>
                <div className={styles.menu}></div>
              </div>
              <div className={styles.currentPlan}>
                <div className={styles.plan}>
                  <div>
                    <div className={styles.planHeader}>
                      Airplane PLAN
                    </div>
                    <div className={styles.planPrice}>
                      <span>$</span>29.95
                    </div>
                  </div>
                  <div className={styles.planDate}>
                    <div>JAN 28TH</div>
                    <div>FEB 28TH</div>
                  </div>
                </div>
                <div className={styles.textQuestion}>
                  항공권 예약 내역
                  <br />
                </div>
              </div>
              <div className={styles.planBox}>
                <div className={styles.planOptions}>
                  <div>
                    <div>
                      인천국제공항
                      <span>
                        <br />
                        ICN
                      </span>
                    </div>
                    <div>Korea</div>
                  </div>
                  <div>
                    <div>
                      후쿠오카공항<span>FUK</span>
                    </div>
                    <div>Japan</div>
                  </div>
                </div>
                <div className={styles.planText}>
                  Have a safe and enjoyable flight!
                </div>
                <a className={styles.changePlan} href=''>
                  Go to Fly!
                </a>
              </div>
              <div className={styles.planList}>
                <div className={styles.planLimit}>
                  <div className={styles.limitText}>
                    <div>
                      <strong>
                        가는 편
                        <span>
                          14:05 ~ 15:00 <br />
                        </span>
                      </strong>
                      <span className={styles.limitSubtext}>
                        <span>
                          대한 항공 Korean Air <br />
                        </span>
                        224,500원
                      </span>
                    </div>
                    <span
                      className={styles.limitSubtext}
                    ></span>
                  </div>
                  <div className={styles.limitIcon}></div>
                </div>
                <div className={styles.planLimit}>
                  <div className={styles.limitText}>
                    <div>
                      <strong>오는편</strong>
                      <span>
                        20:30 ~ 21:40 <br />
                      </span>
                    </div>
                    <span className={styles.limitSubtext}>
                      아시아나 항공 Asiana Airplane
                    </span>
                  </div>
                  <div
                    className={`${styles.limitIcon} ${styles.upgrade}`}
                  ></div>
                </div>
              </div>
              <div className={styles.bottomIcons}>
                <div className={styles.chart}>
                  <div></div>
                </div>
                <div className={styles.eye}>
                  <div></div>
                </div>
                <div className={styles.equalizer}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className={styles.homeButton}></div>
            </div>
          </div>
          <div className={styles.phoneReflections}>
            <div className={styles.reflection1}></div>
            <div className={styles.reflection2}></div>
            <div className={styles.reflection3}></div>
            <div className={styles.reflection4}></div>
            <div className={styles.reflection5}></div>
            <div className={styles.reflection6}></div>
            <div className={styles.reflection7}></div>
          </div>
        </div>
        <div className={styles.introduceBox}>
          <h3>쉽고 빠른 항공편 보기</h3>
          <p>
            여행을 계획할 때 가장 중요한 첫걸음, 비행기
            예약! <br /> 이제 편도와 왕복 항공편을 손쉽게
            알아볼수 있습니다. <br /> 간편한 검색과 직관적인
            인터페이스로, <br /> 원하는 항공편을 몇 번의
            클릭만으로 찾아보세요. <br /> 여행의 시작을
            스트레스 없이 준비하세요!
          </p>
          <Button
            onClick={goToLogin}
            startIcon={<ArrowForwardIcon />}
            variant='contained'
            style={{
              backgroundColor: '#275963',
              borderRadius: '10px',
              textAlign: 'left',
            }}
          >
            {' '}
            항공권 <br />
            검색하러 가기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Phone;
