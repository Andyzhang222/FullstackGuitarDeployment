import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import locationReducer from './locationSlice';
import authReducer from './authSlice'; // ✅ 引入 authSlice

const store = configureStore({
  reducer: {
    cart: cartSlice,
    location: locationReducer,
    auth: authReducer, // ✅ 添加 auth 到 Redux Store
  },
});

export default store; // ✅ 默认导出 store

// ✅ 定义 RootState 类型，供 useSelector 使用
export type RootState = ReturnType<typeof store.getState>;

// ✅ 定义 AppDispatch 类型，供 useDispatch 使用
export type AppDispatch = typeof store.dispatch;
