"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
class HomeController {
    constructor() {
        this.path = "/";
        this.router = express.Router();
        this.home = (req, res) => {
            res.send("success");
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.home);
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map