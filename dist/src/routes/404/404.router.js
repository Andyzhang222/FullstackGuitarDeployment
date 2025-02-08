"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const resBody = http_status_1.default[http_status_1.default.NOT_FOUND];
router.all("*", (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json(resBody);
});
exports.default = router;
//# sourceMappingURL=404.router.js.map