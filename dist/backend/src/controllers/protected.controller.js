"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
class ProtectedController {
    constructor() {
        this.path = "/protected";
        this.router = express.Router();
        this.secret = (req, res) => {
            res.send("you can view secret");
        };
        this.authMiddleware = new auth_middleware_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.authMiddleware.verifyToken);
        this.router.get("/secret", this.secret);
    }
}
exports.default = ProtectedController;
//# sourceMappingURL=protected.controller.js.map