import React, { useEffect, useContext } from 'react';
import {
  API_BASE_URL,
  USER,
} from '../../config/host-config';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NaverLoginHandler = () => {
  console.log('사용자가 naver인증서버에서 redirect 진행함');
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(
    window.location.href,
  ).searchParams.get('code');
  //
  useEffect(() => {
    const NaverLogin = async () => {
      console.log('code: ', code);
      const res = await axios(
        REQUEST_URL + '/naverlogin?code=' + code,
      );
      const result = res.data;
      if (result.phoneNumber) {
        onLogin(result);
        redirection('/main/exrates');
      } else {
        redirection('/login/sns', {
          state: { result, path: 'NAVER' },
        });
      }
    };

    NaverLogin();
  }, []);
};

export default NaverLoginHandler;
