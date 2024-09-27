import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Адрес бэкенда
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
