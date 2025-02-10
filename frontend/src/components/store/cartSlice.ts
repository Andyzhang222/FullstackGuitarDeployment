import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../middleware/apiClient'; // ✅ 确保正确导入
import { RootState } from './store';
import { AxiosError } from 'axios'; // ✅ 导入 AxiosError 以正确处理错误

interface CartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: string;
  isOutOfStock?: boolean;
  availableQuantity?: number;
}

interface StockResult {
  productId: string;
  isInStock: boolean;
  availableQuantity: number;
}

interface CartState {
  items: CartItem[];
  stockStatus: 'idle' | 'checking' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  stockError: string | null;
  outOfStockItems: CartItem[];
}

const initialState: CartState = {
  items: [],
  stockStatus: 'idle',
  status: 'idle',
  error: null,
  stockError: null,
  outOfStockItems: [],
};

// 获取购物车商品
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/carts`);
      return response.data.cartItems as CartItem[];
    } catch (err) {
      const error = err as AxiosError; // ✅ 明确类型
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('获取购物车失败');
    }
  }
);

// 检查库存
export const checkStock = createAsyncThunk(
  'cart/checkStock',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/carts/check-all-stock`);
      return response.data.stockResults as StockResult[];
    } catch (err) {
      const error = err as AxiosError; // ✅ 明确类型
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('库存检查失败');
    }
  }
);

// 添加商品到购物车
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const existingItem = state.cart.items.find(
        (item) => item.productId === productId
      );

      let response;
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
        response = await apiClient.post(`/carts/update`, {
          productId,
          quantity: updatedQuantity,
        });
        return { ...existingItem, quantity: updatedQuantity };
      } else {
        response = await apiClient.post(`/carts`, { productId, quantity });
        return response.data as CartItem;
      }
    } catch (err) {
      const error = err as AxiosError; // ✅ 明确类型
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('添加商品失败');
    }
  }
);

// 删除购物车商品（减少数量）
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const existingItem = state.cart.items.find(
        (item) => item.productId === productId
      );

      if (!existingItem) return rejectWithValue('商品不在购物车中');

      if (existingItem.quantity > 1) {
        await apiClient.post(`/carts/update`, {
          productId,
          quantity: existingItem.quantity - 1,
        });
        return { ...existingItem, quantity: existingItem.quantity - 1 };
      } else {
        await apiClient.post(`/carts/remove`, { productId });
        return productId;
      }
    } catch (err) {
      const error = err as AxiosError; // ✅ 明确类型
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('删除商品失败');
    }
  }
);

// 删除整个商品
export const removeEntireCartItem = createAsyncThunk(
  'cart/removeEntireCartItem',
  async (productId: string, { rejectWithValue }) => {
    try {
      await apiClient.post(`/carts/remove-entire`, { productId });
      return productId;
    } catch (err) {
      const error = err as AxiosError; // ✅ 明确类型
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('删除购物车商品失败');
    }
  }
);

// Redux Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 获取购物车
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // 检查库存
      .addCase(checkStock.pending, (state) => {
        state.stockStatus = 'checking';
      })
      .addCase(checkStock.fulfilled, (state, action) => {
        state.stockStatus = 'succeeded';

        state.items = state.items.map((item) => {
          const stockInfo = action.payload.find(
            (stock) => stock.productId === item.productId
          );
          if (stockInfo) {
            return {
              ...item,
              isOutOfStock: item.quantity > stockInfo.availableQuantity,
              availableQuantity: stockInfo.availableQuantity,
            };
          }
          return item;
        });

        state.outOfStockItems = state.items.filter((item) => item.isOutOfStock);
        state.stockError = state.outOfStockItems.length
          ? '部分商品库存不足'
          : null;
      })
      .addCase(checkStock.rejected, (state, action) => {
        state.stockStatus = 'failed';
        state.stockError = action.payload as string;
      })

      // 添加到购物车
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })

      // 减少购物车商品数量
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.items = state.items.filter(
            (item) => item.productId !== action.payload
          );
        } else {
          const productId = action.payload.productId;
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }
      })

      // 删除整个商品
      .addCase(removeEntireCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectOutOfStockItems = (state: { cart: CartState }) =>
  state.cart.outOfStockItems;

export default cartSlice.reducer;
