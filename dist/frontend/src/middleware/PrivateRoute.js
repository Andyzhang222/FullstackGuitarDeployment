"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    return isAuthenticated ? <>{children}</> : <react_router_dom_1.Navigate to="/"/>;
};
exports.default = PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map