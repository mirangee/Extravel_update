import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import googleCircle from '../../assets/img/google_circle.png';
import axios from 'axios';

const GoogleCustomLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Google API를 사용하여 사용자 정보를 가져옵니다.
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );
        console.log(res.data); // 사용자 정보가 res.data에 포함됩니다.
        const { email, name } = res.data;
        console.log(`Email: ${email}, Name: ${name}`);
        axios.post(
          'http://localhost:8181/user/auth/google',
          { name, email },
        );
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <>
      <div
        onClick={() => login()}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '100%',
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
