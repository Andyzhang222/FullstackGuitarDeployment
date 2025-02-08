"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const express_http_context_1 = tslib_1.__importDefault(require("express-http-context"));
const logger_1 = tslib_1.__importDefault(require("utils/logger"));
const uniqueReqId = (req, res, next) => {
    express_http_context_1.default.set("ReqId", (0, uuid_1.v4)());
    logger_1.default.info(`START Request Id: ${express_http_context_1.default.get("ReqId")}`);
    res.on("finish", () => {
        logger_1.default.info(`END Request Id: ${express_http_context_1.default.get("ReqId")}`);
    });
    return next();
};
exports.default = uniqueReqId;
//# sourceMappingURL=uniqueReqId.middleware.js.map