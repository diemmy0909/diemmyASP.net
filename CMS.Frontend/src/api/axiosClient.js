import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5188/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Bạn có thể thiết lập interceptors ở đây nếu cần (ví dụ: đính kèm token)
// axiosClient.interceptors.request.use(config => ...);

export default axiosClient;
