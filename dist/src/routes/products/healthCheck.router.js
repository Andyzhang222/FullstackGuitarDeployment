"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const healthCheck_controller_1 = tslib_1.__importDefault(require("./healthCheck.controller"));
const router = (0, express_1.Router)();
router.get("/products", healthCheck_controller_1.default);
exports.default = router;
//# sourceMappingURL=healthCheck.router.js.map