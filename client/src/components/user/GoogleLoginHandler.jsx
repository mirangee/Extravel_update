import React from 'react';
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginHandler = () => {
  const GOOGLE_CLIENT_ID =
    process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decodedToken = jwtDecode(
        credentialResponse.credential,
      );
      const accessToken = credentialResponse.credential;

      console.log('Decoded Token:', decodedToken);
      console.log('Access Token:', accessToken);

      // 백엔드로 access_token을 보내는 POST 요청
      fetch('http://locallhost:8181/user/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginHandler;
