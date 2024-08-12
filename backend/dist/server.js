"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bodyParser = __importStar(require("body-parser"));
const home_controller_1 = __importDefault(require("./controllers/home.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const protected_controller_1 = __importDefault(require("./controllers/protected.controller"));
const ProductController_1 = __importDefault(require("./controllers/ProductController"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = new app_1.default({
    port: 5001,
    controllers: [
        new home_controller_1.default(),
        new auth_controller_1.default(),
        new protected_controller_1.default(),
        new ProductController_1.default(),
    ],
    middleWares: [
        (0, cors_1.default)(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});
app.listen();
//# sourceMappingURL=server.js.map