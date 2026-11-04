
import axios from 'axios';

// Express 서버 주소 설정
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default api;
