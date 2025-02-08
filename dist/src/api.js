"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const healthCheck_router_1 = tslib_1.__importDefault(require("routes/healthcheck/healthCheck.router"));
const healthCheck_router_2 = tslib_1.__importDefault(require("routes/products/healthCheck.router"));
const router = (0, express_1.Router)();
router.use(healthCheck_router_1.default);
router.use(healthCheck_router_2.default);
exports.default = router;
//# sourceMappingURL=api.js.map