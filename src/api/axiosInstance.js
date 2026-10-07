import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${(import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')}/api/v1`,
    withCredentials: true,
    timeout: 15_000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});