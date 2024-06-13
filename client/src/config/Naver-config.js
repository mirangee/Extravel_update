const CLIENT_ID = process.env.REACT_APP_REST_API_NAVER_KEY;

const REACT_APP_REDIRECT_NAVER_URI =
  process.env.REACT_APP_REST_API_NAVER_REDIRECT;

// const NAVER_TOKEN =
//   process.env.REACT_APP_REST_API_NAVER_TOKEN;

export const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize
    ?response_type=code
    &client_id=${CLIENT_ID}
    &redirect_uri=${REACT_APP_REDIRECT_NAVER_URI}
    &state=https://www.naver.com`;
