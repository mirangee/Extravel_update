import React, { useState } from 'react';
import Login from './Login.jsx';
import {
  API_BASE_URL,
  USER,
} from '../config/host-config.jsx';

const Check = ({ name, phone, email, password }) => {
  // 상태 변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  // 회원 가입 처리 서버 요청
  const fetchSignUpPost = () => {
    fetch(`${API_BASE_URL}${USER}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userValue),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(
          `${data.name}(${data.email})님 회원가입에 성공했습니다.`,
        );
      })
      .catch((err) => {
        console.log('err: ', err);
        alert(
          '서버와의 통신이 원활하지 않습니다. 관리자에게 문의하세요.',
        );
      });
  };

  // 회원 가입 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    fetchSignUpPost();
  };

  return <div>Check</div>;
};

export default Check;
