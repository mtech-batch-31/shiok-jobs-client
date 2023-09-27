import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_RECYCLE_API_URL, // 你的 API base URL
  });

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    const idToken = Cookies.get('idToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    if (idToken) config.headers['x-id-token'] = idToken;
    if (refreshToken) config.headers['x-refresh-token'] = refreshToken;

    return config;
  });

  export default axiosInstance;
