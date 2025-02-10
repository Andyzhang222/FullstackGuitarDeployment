import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || null, // ✅ 确保为空时为 null
  refreshToken: localStorage.getItem('refreshToken') || null, // ✅ 确保为空时为 null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ 设置 accessToken，并同步存入 localStorage
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    // ✅ 设置 refreshToken，并同步存入 localStorage
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    // ✅ 清空 accessToken 和 refreshToken
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

// ✅ 导出 actions 供组件和 axiosInterceptor.ts 使用
export const { setAccessToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
