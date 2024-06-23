import React, { useState, useEffect } from 'react';

function AuthNumTimer() {
  // 초기 타이머 시간 (초)을 정의함. 180초, 3분.
  const initialTime = 60;
  // 남은 시간을 상태로 관리함.
  const [remainingTime, setRemainingTime] =
    useState(initialTime);

  const [resendClickCount, setResendClickCount] =
    useState(0);

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 타이머 시작.
    const timer = setInterval(() => {
      // 남은 시간이 0보다 크면 1초씩 감소시킴.
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        // 남은 시간이 0이 되면 타이머 정지.
        clearInterval(timer);
      }
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머 정지
    return () => clearInterval(timer);
  }, [remainingTime]); // remainingTime이 변경될 때마다 useEffect가 다시 실행됨.

  // 시간을 분과 초로 변환하는 함수 정의.
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // 재전송 버튼을 클릭했을 때 호출되는 함수 정의.
  const handleResendClick = () => {
    // 남은 시간을 초기값으로 설정하여 타이머 재설정.
    setRemainingTime(initialTime);

    // 클릭 횟수 증가
    setResendClickCount((prevCount) => prevCount + 1);

    // 남은 횟수를 알림으로 표시
    const remainingAttempts = 2 - resendClickCount - 1; // 현재 클릭 후 남은 시도 횟수 계산
    if (remainingAttempts > 0) {
      alert(
        `재전송 버튼을 ${remainingAttempts}번 더 클릭할 수 있습니다.`,
      );
    } else {
      alert('더 이상 재전송할 수 없습니다.');
    }
  };

  return (
    <div>
      {/* 인증번호 유효 시간을 화면에 출력. */}
      <h1 style={{ fontSize: '16px' }}>
        인증번호 유효 시간:{' '}
        <span style={{ color: 'red' }}>
          {formatTime(remainingTime)}
        </span>
      </h1>

      {/* 재전송 버튼을 추가하고, 스타일을 지정. */}
      {resendClickCount < 3 && (
        <button
          onClick={handleResendClick}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          재전송
        </button>
      )}
    </div>
  );
}

export default AuthNumTimer;
