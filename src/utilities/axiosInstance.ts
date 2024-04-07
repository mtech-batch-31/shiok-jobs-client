import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_SHIOK_JOBS_BFF_URL, // 你的 API base URL
    baseURL: process.env.REACT_APP_GATEWAY_URL, // 你的 API 
  });
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    // const idToken = Cookies.get('idToken');
    // const refreshToken = Cookies.get('refreshToken');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    // if (idToken) config.headers['x-id-token'] = idToken;
    // if (refreshToken) config.headers['x-refresh-token'] = refreshToken;

    return config;
  });

  export default axiosInstance;
