"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const config_1 = tslib_1.__importDefault(require("config/config"));
const logger_1 = tslib_1.__importDefault(require("utils/logger"));
morgan_1.default.token("message", (req, res) => res.locals.errorMessage || "");
const clientRemoteAddr = () => config_1.default.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${clientRemoteAddr()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${clientRemoteAddr()}:method :url :status - :response-time ms - message: :message`;
const successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.default.info(message.trim()) },
});
const errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.default.error(message.trim()) },
});
exports.default = { successHandler, errorHandler };
//# sourceMappingURL=httpLogger.js.map