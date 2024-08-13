import React, { useContext, useEffect } from 'react';
import {
  API_BASE_URL,
  USER,
} from '../../config/host-config';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(
    window.location.href,
  ).searchParams.get('code');

  useEffect(() => {
    // 컴포넌트가 렌더링될 때, 인가 코드를 백엔드로 전송하는 fetch
    const kakaoLogin = async () => {
      const res = await axios(
        REQUEST_URL + '/kakaologin?code=' + code,
      );
      const result = res.data;
      if (result.phoneNumber) {
        onLogin(result);
        redirection('/main/exrates');
      } else {
        redirection('/login/sns', {
          state: { result, path: 'KAKAO' },
        });
      }
    };

    kakaoLogin();
  }, []);
};

export default KakaoLoginHandler;
