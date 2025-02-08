"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const system_1 = require("@mui/system");
const material_1 = require("@mui/material");
const Close_1 = tslib_1.__importDefault(require("@mui/icons-material/Close"));
const ContactModalContainer = (0, system_1.styled)('div')({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '420px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    boxSizing: 'border-box',
});
const CloseButton = (0, system_1.styled)(material_1.IconButton)({
    alignSelf: 'flex-end',
    marginBottom: '24px',
});
const Section = (0, system_1.styled)('div')({
    marginBottom: '24px',
});
const ContactUsTitle = (0, system_1.styled)(material_1.Typography)({
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
    color: '#02000C',
    marginBottom: '8px',
});
const ContactUsSubtitle = (0, system_1.styled)(material_1.Typography)({
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    color: '#76757C',
    marginBottom: '24px',
});
const ContactUsDetail = (0, system_1.styled)(material_1.Typography)({
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    color: '#02000C',
    marginBottom: '8px',
});
const ContactUsText = (0, system_1.styled)(material_1.Typography)({
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    color: '#000',
    marginBottom: '24px',
});
const ContactModal = ({ onClose }) => {
    return (<ContactModalContainer>
      <CloseButton onClick={onClose}>
        <Close_1.default />
      </CloseButton>
      <Section>
        <ContactUsTitle>Contact us</ContactUsTitle>
        <ContactUsSubtitle>
          Feel free to contact us if you need more information about our guitars
          or any of our services.
        </ContactUsSubtitle>
      </Section>
      <Section>
        <ContactUsDetail>Contact number</ContactUsDetail>
        <ContactUsText>647-555-325</ContactUsText>
      </Section>
      <Section>
        <ContactUsDetail>Email</ContactUsDetail>
        <ContactUsText>guitar123@guitar.com</ContactUsText>
      </Section>
      <Section>
        <ContactUsDetail>Available hours</ContactUsDetail>
        <ContactUsText>Mon - Fri, 10:00 am - 10:00 pm (EST)</ContactUsText>
        <ContactUsText>Sat - Sun, 10:00 am - 6:00pm (EST)</ContactUsText>
      </Section>
    </ContactModalContainer>);
};
exports.default = ContactModal;
//# sourceMappingURL=ContactModal.js.map