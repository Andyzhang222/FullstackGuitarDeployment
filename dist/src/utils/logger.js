"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const runtime_node_refresh_1 = tslib_1.__importDefault(require("runtime-node-refresh"));
const express_http_context_1 = tslib_1.__importDefault(require("express-http-context"));
const config_1 = tslib_1.__importDefault(require("config/config"));
const errorStackFormat = winston_1.default.format((info) => {
    if (info instanceof Error) {
        return Object.assign(Object.assign({}, info), { stack: info.stack, message: info.message });
    }
    return info;
});
const errorTemplate = ({ timestamp, level, message, stack }) => {
    const reqId = express_http_context_1.default.get("ReqId");
    let tmpl = `${timestamp}`;
    if (reqId)
        tmpl += ` ${reqId}`;
    if (typeof message === "object")
        tmpl += ` ${JSON.stringify(message)}`;
    tmpl += ` ${level} ${message}`;
    if (stack)
        tmpl += ` \n ${stack}`;
    return tmpl;
};
const logger = winston_1.default.createLogger({
    level: config_1.default.env === "development" ? "debug" : "info",
    format: winston_1.default.format.combine(errorStackFormat(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), config_1.default.env === "development"
        ? winston_1.default.format.colorize()
        : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.printf(errorTemplate)),
    transports: [
        new winston_1.default.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});
const avbLogLevels = [
    "error",
    "warn",
    "info",
    "http",
    "verbose",
    "debug",
    "silly",
];
let currentLogLevel = logger.levels[logger.level];
logger.info(`Logger level is set to ${logger.level}`);
// Refresh log level on runtime
(0, runtime_node_refresh_1.default)(() => {
    if (currentLogLevel < avbLogLevels.length - 1) {
        currentLogLevel += 1;
    }
    else {
        currentLogLevel = 0;
    }
    const found = Object.entries(logger.levels).find(([, value]) => value === currentLogLevel);
    if (found && found.length) {
        // eslint-disable-next-line
        console.log(`${new Date().toISOString()} system: Switch logger level from ${logger.level} to ${found[0]}`);
        logger.level = found[`${0}`];
    }
});
exports.default = logger;
//# sourceMappingURL=logger.js.map