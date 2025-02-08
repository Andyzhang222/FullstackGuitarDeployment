"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const home_controller_1 = tslib_1.__importDefault(require("./controllers/home.controller"));
const auth_controller_1 = tslib_1.__importDefault(require("./controllers/auth.controller"));
const protected_controller_1 = tslib_1.__importDefault(require("./controllers/protected.controller"));
const ProductController_1 = tslib_1.__importDefault(require("./controllers/ProductController"));
const CartController_1 = tslib_1.__importDefault(require("./controllers/CartController")); // Import the CartController
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cors_1 = tslib_1.__importDefault(require("cors"));
dotenv_1.default.config();
const app = new app_1.default({
    port: 5001,
    controllers: [
        new home_controller_1.default(),
        new auth_controller_1.default(),
        new protected_controller_1.default(),
        new ProductController_1.default(),
        new CartController_1.default(), // Add the CartController
    ],
    middleWares: [
        (0, cors_1.default)(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ],
});
app.listen();
//# sourceMappingURL=server.js.map