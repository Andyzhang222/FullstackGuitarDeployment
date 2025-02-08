"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Close_1 = tslib_1.__importDefault(require("@mui/icons-material/Close"));
const system_1 = require("@mui/system");
const ModalContainer = (0, system_1.styled)(material_1.Box)({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '420px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto',
});
const CloseButton = (0, system_1.styled)(material_1.IconButton)({
    alignSelf: 'flex-end',
    color: '#02000C', // 确保关闭按钮为黑色
});
const PickUpModal = ({ onClose }) => {
    return (<ModalContainer>
      <CloseButton onClick={onClose}>
        <Close_1.default />
      </CloseButton>
      <material_1.Typography variant="h6" sx={{ fontWeight: 500, color: '#02000C' }}>
        Pick up address
      </material_1.Typography>
      <material_1.Typography variant="body1" sx={{ color: '#76757C', marginBottom: '16px' }}>
        Visit our store to pick up your guitar.
      </material_1.Typography>
      <material_1.Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02000C' }}>
        Store address
      </material_1.Typography>
      <material_1.Typography variant="body1" sx={{ color: '#02000C', marginBottom: '16px' }}>
        382 Yonge Street, Toronto
      </material_1.Typography>
      <material_1.Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02000C' }}>
        Opening hours
      </material_1.Typography>
      <material_1.Typography variant="body1" sx={{ color: '#02000C' }}>
        Mon - Fri, 10:00 am - 10:00 pm (EST)
        <br />
        Sat - Sun, 10:00 am - 6:00pm (EST)
      </material_1.Typography>
    </ModalContainer>);
};
exports.default = PickUpModal;
//# sourceMappingURL=PickUpModal.js.map