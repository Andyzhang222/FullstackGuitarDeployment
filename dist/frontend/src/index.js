"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const client_1 = tslib_1.__importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = tslib_1.__importDefault(require("./App"));
const reportWebVitals_1 = tslib_1.__importDefault(require("./reportWebVitals"));
const react_redux_1 = require("react-redux");
const store_1 = tslib_1.__importDefault(require("./components/store/store")); // 确保路径正确
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.default}>
      {' '}
      {/* 将 Provider 包裹在 App 外 */}
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map