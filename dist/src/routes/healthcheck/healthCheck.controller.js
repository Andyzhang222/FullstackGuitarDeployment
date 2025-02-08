"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const healthcheck = (req, res) => {
    res.status(http_status_1.default.OK);
    res.send({ status: "OK", data: new Date().toJSON() });
};
exports.default = healthcheck;
//# sourceMappingURL=healthCheck.controller.js.map