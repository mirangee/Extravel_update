import React from 'react';
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

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
      const { name, email } = decodedToken;
      console.log('Access Token:', accessToken);

      // 백엔드로 access_token을 보내는 POST 요청
      axios
        .post('http://localhost:8181/user/auth/google', {
          name,
          email,
          accessToken,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          console.log('잘했다');
        });
      // fetch('http://localhost:8181/user/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, email, accessToken }),
      // })
      //   .then((response) => response.text)
      //   .then((data) => {
      //     console.log('Success:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
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
