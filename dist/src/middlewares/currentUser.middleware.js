"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const appError_1 = tslib_1.__importDefault(require("utils/appError"));
const currentUser = async (req, res, next) => {
    try {
        // access token convert into user identity
        next();
    }
    catch (error) {
        res.status(http_status_1.default.UNAUTHORIZED).json({ error: error.message });
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, error);
    }
};
exports.default = currentUser;
//# sourceMappingURL=currentUser.middleware.js.map