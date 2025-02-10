import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import store, { RootState } from '../components/store/store';
import { setAccessToken, logout } from '../components/store/authSlice';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true, // 允许携带 Cookies（适用于 httpOnly Refresh Token）
});

// **防止并发请求时，多次触发 refresh token**
let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

// ✅ 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      (store.getState() as RootState)?.auth?.accessToken ||
      localStorage.getItem('accessToken');

    if (accessToken) {
      if (!config.headers) {
        config.headers = new AxiosHeaders(); // ✅ 确保 headers 正确赋值
      }
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 处理 401（未授权），尝试刷新 accessToken
    // ✅ 处理 401（未授权），尝试刷新 accessToken
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (!originalRequest.headers) {
              originalRequest.headers = new AxiosHeaders();
            }
            originalRequest.headers.set('Authorization', `Bearer ${token}`);
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        console.log('🔄 发送 refresh token 请求...');

        // ✅ 确保 refreshToken 传递
        // ✅ 确保 refreshToken 传递
        const refreshToken = localStorage.getItem('refreshToken');
        const idToken = localStorage.getItem('idToken');

        if (!refreshToken || !idToken) {
          console.warn('⚠️ 没有 refreshToken 或 idToken，无法刷新');
          throw new Error('No refreshToken or idToken');
        }

        // ✅ 解析 sub（UUID）
        const decodedToken = JSON.parse(atob(idToken.split('.')[1]));
        const userSub = decodedToken.sub; // 获取 sub (UUID)

        const response = await axios.post(
          'http://localhost:5001/auth/refresh-token',
          { refreshToken, userSub }, // ✅ 发送 userSub
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        localStorage.setItem('accessToken', newAccessToken);

        failedRequestsQueue.forEach((req) => req.resolve(newAccessToken));
        failedRequestsQueue = [];

        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${newAccessToken}`
        );
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('⛔ 刷新 token 失败，用户需要重新登录:', refreshError);
        store.dispatch(logout());
        // window.location.href = '/sign';

        failedRequestsQueue.forEach((req) => req.reject(refreshError));
        failedRequestsQueue = [];

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
