"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("utils/logger"));
const appError_1 = tslib_1.__importDefault(require("./appError"));
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleError", "isTrustedError"] }] */
class ErrorHandler {
    handleError(error) {
        logger_1.default.error(error);
    }
    isTrustedError(error) {
        if (error instanceof appError_1.default) {
            return error.isOperational;
        }
        return false;
    }
}
exports.default = new ErrorHandler();
//# sourceMappingURL=errorHandler.js.map