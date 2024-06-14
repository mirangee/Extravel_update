import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleCustomLogin from './GoogleCustomLogin';

const GoogleLogin = () => {
  const GOOGLE_CLIENT_ID =
    process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleCustomLogin />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLogin;
