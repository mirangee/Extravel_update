import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const MyPageCard = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // 페이지가 로드될 때 현재 날짜를 가져와서 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(
      2,
      '0',
    );
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}/${month}/${day}`);
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          marginTop: '100px',
          paddingLeft: '340px',
        }}
      >
        <h3
          style={{
            background: 'red',
            fontSize: '64px',
            backgroundImage:
              'linear-gradient(to right top, #a6d2df, #0a4a58)',
            color: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            fontWeight: 'bold',
          }}
        >
          My Exchange{' '}
          <Button
            style={{
              marginLeft: '140px',
              width: '150px',
              height: '50px',
              textAlign: 'center',
              background: '#14505c',
            }}
          >
            추가 환전하기
          </Button>
        </h3>
        <div
          style={{
            margin: '20px auto',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#14505C',
            // textAlign: 'center',
          }}
        >
          {currentDate}
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'lightgray',
            width: '800px',
            borderRadius: '20px',
            boxShadow: '1px 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardActions
            style={{
              // background: 'red',
              width: '48%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 아이템들을 세로 방향으로 가운데 정렬
              padding: '20px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/150px-Flag_of_South_Korea.svg.png'
                alt='KR'
                style={{
                  width: '150px',
                  height: '100px',
                  margin: '10px auto',
                }}
              />
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                }}
              >
                <li style={{ margin: '20px auto' }}>
                  1,381 KRW = 1 USD
                </li>
                <h3 style={{ margin: '20px auto' }}>
                  276,200 KRW
                </h3>
              </ul>
            </div>
          </CardActions>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{
              // background: 'orange',
              fontSize: '64px',
              marginTop: '85px',
            }}
          />
          <CardActions
            style={{
              // background: 'skyblue',
              width: '48%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 아이템들을 세로 방향으로 가운데 정렬
              padding: '20px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/150px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                alt='US'
                style={{
                  width: '150px',
                  height: '100px',
                  margin: '10px auto',
                }}
              />
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                }}
              >
                <li
                  style={{
                    margin: '20px auto',
                    textAlign: 'center',
                    fontSize: '26px',
                    marginTop: '50px',
                  }}
                >
                  200 USD
                </li>
              </ul>
            </div>
          </CardActions>
        </div>
      </div>
      {/* 카드 2부분 */}
      <div
        className='card2'
        style={{
          width: '100%',
          marginTop: '30px',
          paddingLeft: '340px',
        }}
      >
        <div
          style={{
            margin: '20px auto',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#14505C',
            // textAlign: 'center',
          }}
        >
          {currentDate}
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'lightgray',
            width: '800px',
            borderRadius: '20px',
            boxShadow: '1px 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardActions
            style={{
              // background: 'red',
              width: '48%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 아이템들을 세로 방향으로 가운데 정렬
              padding: '20px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/150px-Flag_of_South_Korea.svg.png'
                alt='KR'
                style={{
                  width: '150px',
                  height: '100px',
                  margin: '10px auto',
                }}
              />
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                }}
              >
                <li style={{ margin: '20px auto' }}>
                  1,381 KRW = 1 USD
                </li>
                <h3 style={{ margin: '20px auto' }}>
                  276,200 KRW
                </h3>
              </ul>
            </div>
          </CardActions>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{
              // background: 'orange',
              fontSize: '64px',
              marginTop: '85px',
            }}
          />
          <CardActions
            style={{
              // background: 'skyblue',
              width: '48%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 아이템들을 세로 방향으로 가운데 정렬
              padding: '20px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/150px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                alt='US'
                style={{
                  width: '150px',
                  height: '100px',
                  margin: '10px auto',
                }}
              />
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                }}
              >
                <li
                  style={{
                    margin: '20px auto',
                    textAlign: 'center',
                    fontSize: '26px',
                    marginTop: '50px',
                  }}
                >
                  200 USD
                </li>
              </ul>
            </div>
          </CardActions>
        </div>
      </div>
    </>
  );
};

export default MyPageCard;
