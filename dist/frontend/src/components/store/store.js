"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const cartSlice_1 = tslib_1.__importDefault(require("./cartSlice"));
const locationSlice_1 = tslib_1.__importDefault(require("./locationSlice")); // 引入 locationReducer
const store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
        location: locationSlice_1.default, // 添加 locationReducer 到 store 中
        // 其他 reducer
    },
});
exports.default = store; // 默认导出 store
//# sourceMappingURL=store.js.map