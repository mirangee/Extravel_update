const CLIENT_ID = process.env.REACT_APP_REST_API_CLIENT_ID;

const REDIRECT_NAVER_URI =
  process.env.REACT_APP_REDIRECT_NAVER_URI;

const REACT_STATE = process.env.REACT_APP_STATE;

export const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${REACT_STATE}&redirect_uri=${REDIRECT_NAVER_URI}`;
