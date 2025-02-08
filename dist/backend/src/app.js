"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
class App {
    constructor(appInit) {
        this.app = (0, express_1.default)();
        this.port = appInit.port;
        this.host = process.env.HOST || "0.0.0.0"; // 默认为 0.0.0.0，允许外部访问
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            console.log(`Applying middleware: ${middleWare.name || "anonymous middleware"}`);
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach((controller) => {
            console.log(`Initializing route: ${controller.path}`);
            this.app.use(controller.path, controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`App listening on http://${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map