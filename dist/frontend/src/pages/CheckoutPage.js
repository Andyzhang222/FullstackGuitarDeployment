"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Header_1 = tslib_1.__importDefault(require("../components/Header/Header"));
const GlobalHeader_1 = tslib_1.__importDefault(require("../components/Header/GlobalHeader"));
const Footer_1 = tslib_1.__importDefault(require("../components/Footer/Footer"));
const CheckoutPageComponent_1 = tslib_1.__importDefault(require("../components/CheckoutPageComponent/CheckoutPageComponent"));
const CheckoutPage = () => {
    return (<material_1.Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Header_1.default />
      <GlobalHeader_1.default />
      <material_1.Box sx={{
            padding: '24px',
            maxWidth: '1800px',
            margin: '0 auto',
            paddingLeft: '72px', // 设置左右边距为 72px
            paddingRight: '72px', // 设置左右边距为 72px
        }}>
        <CheckoutPageComponent_1.default />
      </material_1.Box>
      <Footer_1.default />
    </material_1.Box>);
};
exports.default = CheckoutPage;
//# sourceMappingURL=CheckoutPage.js.map