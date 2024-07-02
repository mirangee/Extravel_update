import React, { useEffect } from 'react';
import {
  API_BASE_URL,
  USER,
} from '../../config/host-config';

const NaverLoginHandler = () => {
  console.log('사용자가 naver인증서버에서 redirect 진행함');

  const REQUEST_URI = API_BASE_URL + USER;

  const code = new URL(
    window.location.href,
  ).searchParams.get('code');
  //
  useEffect(() => {
    const NaverLogin = () => {
      console.log('code: ', code);
      fetch(REQUEST_URI + '/naverlogin?code=' + code)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };

    NaverLogin();
  }, []);

  return <div>NaverLoginHandler</div>;
};

export default NaverLoginHandler;
