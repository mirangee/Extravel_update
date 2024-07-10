import React, { useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import googleCircle from '../../assets/img/google_circle.png';
import axios from 'axios';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './../../config/host-config';
const GoogleCustomLogin = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

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
        const response = await axios.post(
          `${API_BASE_URL}/user/auth/google`,
          { name, email },
        );
        const result = response.data;
        if (result.phoneNumber) {
          onLogin(result);
          redirection('/main/exrates');
        } else {
          redirection('/login/sns', {
            state: { result, path: 'GOOGLE' },
          });
        }
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
