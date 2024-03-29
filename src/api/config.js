import axios from 'axios';

export const baseURL = '/api';

// 创建axios 实例
const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => console.log(err, '网络错误'),
);

export { axiosInstance };
