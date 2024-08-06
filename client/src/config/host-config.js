const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  backEndHostName = 'http://localhost:8181';
} else {
  backEndHostName = 'http://extravel.store';
}

export const API_BASE_URL = backEndHostName;
export const USER = '/user/auth';
