import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import googleCircle from '../../assets/img/google_circle.png';
import axios from 'axios';

const GoogleCustomLogin = () => {
  const requestHandler = (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    axios
      .post('http://localhost:8181/user/auth/google', {
        accessToken,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        console.log('요청 시도 완료');
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      requestHandler(tokenResponse),
    onError: (error) => console.log(error),
  });
  return (
    <>
      <div
        onClick={() => login()}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '100%',
          display: 'inline',
          margin: '0 5px',
          cursor: 'pointer',
        }}
      >
        <img
          src={googleCircle}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '100%',
            border: '1px solid #dddddd',
          }}
        />
      </div>
    </>
  );
};

export default GoogleCustomLogin;
