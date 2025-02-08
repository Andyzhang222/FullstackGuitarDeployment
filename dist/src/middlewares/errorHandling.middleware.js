"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const errorHandler_1 = tslib_1.__importDefault(require("utils/errorHandler"));
// catch all unhandled errors
const errorHandling = (error, req, res, 
// eslint-disable-next-line
next) => {
    errorHandler_1.default.handleError(error);
    const isTrusted = errorHandler_1.default.isTrustedError(error);
    const httpStatusCode = isTrusted
        ? error.httpCode
        : http_status_1.default.INTERNAL_SERVER_ERROR;
    const responseError = error.message;
    res.status(httpStatusCode).json({
        error: responseError,
    });
};
exports.default = errorHandling;
//# sourceMappingURL=errorHandling.middleware.js.map