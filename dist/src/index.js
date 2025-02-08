"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
require("./server");
// 初始化环境变量
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// 中间件
app.use(express_1.default.json());
// 基本路由
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map