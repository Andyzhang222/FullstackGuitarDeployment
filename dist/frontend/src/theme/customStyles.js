"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleText = exports.PriceTag = exports.SectionHeader = exports.BodyRegular = exports.LogoName = exports.BodyText = void 0;
const tslib_1 = require("tslib");
// customStyles.ts
const system_1 = require("@mui/system");
const Typography_1 = tslib_1.__importDefault(require("@mui/material/Typography"));
exports.BodyText = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto,Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    color: '#FFFFFF',
});
exports.LogoName = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    color: '#FFFFFF', // 使用 85% 不透明度的黑色
});
// Styled component for body text
exports.BodyRegular = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    textAlign: 'left',
    color: '#141414',
});
// 添加 SectionHeader 样式
exports.SectionHeader = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '30px',
    fontWeight: 500,
    lineHeight: '40px',
    textAlign: 'left',
});
exports.PriceTag = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '28px',
    textAlign: 'left',
});
exports.TitleText = (0, system_1.styled)(Typography_1.default)({
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#141414',
});
//# sourceMappingURL=customStyles.js.map