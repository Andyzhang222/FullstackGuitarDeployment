"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const RightSideButtons = ({ truncatedAddress, isAddressSet, handleToggleModal, handlePickUpToggleModal, handleContactToggleModal, }) => {
    return (<material_1.Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            justifyContent: 'flex-end', // 将按钮右对齐
            width: '650px',
        }}>
      <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }} onClick={handleToggleModal}>
        <img src="/images/Header/truck.svg" alt="Delivery Icon"/>
        <material_1.Typography variant="body1" sx={{
            color: isAddressSet ? '#02000C' : '#000',
            textDecoration: isAddressSet ? 'underline' : 'none',
        }}>
          {truncatedAddress}
        </material_1.Typography>
      </material_1.Button>

      <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
        }} onClick={handlePickUpToggleModal}>
        <img src="/images/Header/Shop.svg" alt="Pickup Icon"/>
        <material_1.Typography variant="body1">Halifax</material_1.Typography>
      </material_1.Button>

      <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
        }} onClick={handleContactToggleModal}>
        <img src="/images/Header/Phone.svg" alt="Contact Icon"/>
        <material_1.Typography variant="body1">Contact Us</material_1.Typography>
      </material_1.Button>
    </material_1.Box>);
};
exports.default = RightSideButtons;
//# sourceMappingURL=RightSideButtons.js.map