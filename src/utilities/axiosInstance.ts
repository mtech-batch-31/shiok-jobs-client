import axios from "axios";
// import Cookies from "js-cookie";

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_SHIOK_JOBS_BFF_URL, // 你的 API base URL
    baseURL: process.env.REACT_APP_GATEWAY_URL, // 你的 API 
    withCredentials: true // Enable sending cookies with requests
  });

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  // const accessToken = Cookies.get('accessToken');
  // const idToken = Cookies.get('idToken');
  // const refreshToken = Cookies.get('refreshToken');
  console.log("NEW accessToken from cookie " + accessToken)
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  // if (idToken) config.headers['x-id-token'] = idToken;
  // if (refreshToken) config.headers['x-refresh-token'] = refreshToken;

  return config;
});

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default axiosInstance;
