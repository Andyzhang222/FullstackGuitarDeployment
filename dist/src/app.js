"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const express_http_context_1 = tslib_1.__importDefault(require("express-http-context"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const httpLogger_1 = tslib_1.__importDefault(require("utils/httpLogger"));
const errorHandling_middleware_1 = tslib_1.__importDefault(require("middlewares/errorHandling.middleware"));
const uniqueReqId_middleware_1 = tslib_1.__importDefault(require("middlewares/uniqueReqId.middleware"));
const _404_router_1 = tslib_1.__importDefault(require("routes/404/404.router"));
const api_1 = tslib_1.__importDefault(require("api"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:4100"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // The methods you want to allow
    credentials: true, // This allows session cookies to be sent back and forth
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_http_context_1.default.middleware);
app.use(httpLogger_1.default.successHandler);
app.use(httpLogger_1.default.errorHandler);
app.use(uniqueReqId_middleware_1.default);
app.use(express_1.default.json());
app.use("/api", api_1.default);
app.use(_404_router_1.default);
app.use(errorHandling_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map