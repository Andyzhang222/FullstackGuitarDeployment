"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_CACHE_HAEDER = exports.onlyWithUniqueBody = exports.onlyStatus200 = void 0;
const tslib_1 = require("tslib");
const md5_1 = tslib_1.__importDefault(require("md5"));
const API_CACHE_HAEDER = "apicache-control";
exports.API_CACHE_HAEDER = API_CACHE_HAEDER;
// cache only HTTP response code 200 where apicache-control is not set to no-cache
const onlyStatus200 = (req, res) => {
    if (req.headers["apicache-control"] === "no-cache")
        return false;
    return res.statusCode === 200;
};
exports.onlyStatus200 = onlyStatus200;
// cache only POST requests with unique body
const onlyWithUniqueBody = (req) => {
    if (req.method === "POST" && req.body) {
        return (0, md5_1.default)(JSON.stringify(req.body));
    }
    return req.path;
};
exports.onlyWithUniqueBody = onlyWithUniqueBody;
//# sourceMappingURL=cache.middleware.js.map