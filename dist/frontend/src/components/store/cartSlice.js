"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOutOfStockItems = exports.selectCartItems = exports.removeEntireCartItem = exports.removeFromCart = exports.addToCart = exports.checkStock = exports.fetchCartItems = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const initialState = {
    items: [],
    stockStatus: 'idle',
    status: 'idle',
    error: null,
    stockError: null,
    outOfStockItems: [],
};
// Thunk for fetching cart items
exports.fetchCartItems = (0, toolkit_1.createAsyncThunk)('cart/fetchCartItems', async (_, { rejectWithValue }) => {
    const authToken = localStorage.getItem('accessToken');
    try {
        const response = await axios_1.default.get(`${config_1.default}:5001/carts`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data.cartItems;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
// Thunk for checking stock availability
// Thunk for checking stock availability
exports.checkStock = (0, toolkit_1.createAsyncThunk)('cart/checkStock', async (_, { rejectWithValue }) => {
    const authToken = localStorage.getItem('accessToken');
    try {
        const response = await axios_1.default.get(`${config_1.default}:5001/carts/check-all-stock`, // 修改为正确的路由
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        // 返回库存检查结果，并将其与 cartItems 结合
        return response.data.stockResults;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
// Thunk for adding items to the cart
exports.addToCart = (0, toolkit_1.createAsyncThunk)('cart/addToCart', async ({ productId, quantity }, { rejectWithValue, getState }) => {
    const authToken = localStorage.getItem('accessToken');
    try {
        const state = getState();
        const existingItem = state.cart.items.find((item) => item.productId === productId);
        if (existingItem) {
            const updatedQuantity = existingItem.quantity + quantity;
            await axios_1.default.post(`${config_1.default}:5001/carts/update`, { productId, quantity: updatedQuantity }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return Object.assign(Object.assign({}, existingItem), { quantity: updatedQuantity });
        }
        else {
            const response = await axios_1.default.post(`${config_1.default}:5001/carts`, { productId, quantity }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        }
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
// Thunk for removing items from the cart
exports.removeFromCart = (0, toolkit_1.createAsyncThunk)('cart/removeFromCart', async (productId, { rejectWithValue }) => {
    const authToken = localStorage.getItem('accessToken');
    try {
        await axios_1.default.post(`${config_1.default}:5001/carts/remove`, { productId }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return productId;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
// Thunk for removing the entire cart item (completely delete the item)
exports.removeEntireCartItem = (0, toolkit_1.createAsyncThunk)('cart/removeEntireCartItem', async (productId, { rejectWithValue }) => {
    const authToken = localStorage.getItem('accessToken');
    try {
        // 调用后端 API 完全删除购物车项
        await axios_1.default.post(`${config_1.default}:5001/carts/remove-entire`, { productId }, // 传递 productId
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return productId;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
// Create the slice
// Create the slice
// Create the slice
const cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchCartItems.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(exports.fetchCartItems.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
            .addCase(exports.fetchCartItems.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
            .addCase(exports.checkStock.pending, (state) => {
            state.stockStatus = 'checking';
        })
            .addCase(exports.checkStock.fulfilled, (state, action) => {
            state.stockStatus = 'succeeded';
            // 更新库存信息，并禁用库存不足的商品
            state.items.forEach((item) => {
                const stockInfo = action.payload.find((stock) => stock.productId === item.productId);
                if (stockInfo) {
                    item.isOutOfStock = item.quantity > stockInfo.availableQuantity; // 如果库存不足，标记为不可操作
                    item.availableQuantity = stockInfo.availableQuantity; // 存储可用库存
                }
            });
            const outOfStockItems = state.items.filter((item) => item.isOutOfStock);
            if (outOfStockItems.length > 0) {
                state.outOfStockItems = outOfStockItems;
                state.stockError = 'Some items are out of stock';
            }
            else {
                state.outOfStockItems = [];
                state.stockError = null;
            }
        })
            .addCase(exports.checkStock.rejected, (state, action) => {
            state.stockStatus = 'failed';
            state.stockError = action.payload;
        })
            .addCase(exports.addToCart.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const existingItem = state.items.find((item) => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            }
            else {
                state.items.push(action.payload);
            }
        })
            .addCase(exports.removeFromCart.fulfilled, (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.productId !== productId);
        })
            .addCase(exports.removeEntireCartItem.fulfilled, (state, action) => {
            const productId = action.payload;
            // 完全删除购物车商品
            state.items = state.items.filter((item) => item.productId !== productId);
        });
    },
});
// Export the actions and selectors
const selectCartItems = (state) => state.cart.items;
exports.selectCartItems = selectCartItems;
const selectOutOfStockItems = (state) => state.cart.outOfStockItems;
exports.selectOutOfStockItems = selectOutOfStockItems;
exports.default = cartSlice.reducer;
//# sourceMappingURL=cartSlice.js.map