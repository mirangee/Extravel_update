const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  backEndHostName = 'http://15.165.97.64'; // EC2 서버로 연결
  // backEndHostName = 'http://localhost:8181';
} else if (clientHostName === 'extravel.store') {
  backEndHostName = 'http://15.165.97.64';
}

export const API_BASE_URL = backEndHostName;
export const USER = '/user/auth';
