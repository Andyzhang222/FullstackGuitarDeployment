import './middleware/axiosInterceptor'; // ✅ 确保 Axios 拦截器生效
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/store/store'; // ✅ 确保正确导入 store
import reportWebVitals from './reportWebVitals';

// ✅ 在全局 window 上暴露 store，方便在 Console 里调试
// (window as any).store = store;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
