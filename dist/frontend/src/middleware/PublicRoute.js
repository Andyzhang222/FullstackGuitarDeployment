"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const PublicRoute = ({ authenticated }) => {
    return authenticated ? <react_router_dom_1.Navigate to="/home"/> : <react_router_dom_1.Outlet />;
};
exports.default = PublicRoute;
//# sourceMappingURL=PublicRoute.js.map