const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  // 개발 중
  backEndHostName = 'http://localhost:3000';
} else if (clientHostName === 'spring.com') {
  // 배포해서 서비스 중
  backEndHostName = 'https://api.spring.com';
}

export const API_BASE_URL = backEndHostName;
export const TODO = '/api/todos';
export const USER = '/api/auth'; //@@@
