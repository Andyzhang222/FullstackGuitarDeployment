import React from 'react';
import { styled } from '@mui/system';
import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ContactModalContainer = styled('div')({
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

const CloseButton = styled(IconButton)({
  alignSelf: 'flex-end',
  marginBottom: '24px',
});

const Section = styled('div')({
  marginBottom: '24px',
});

const ContactUsTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px',
  color: '#02000C',
  marginBottom: '8px',
});

const ContactUsSubtitle = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#76757C',
  marginBottom: '24px',
});

const ContactUsDetail = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  color: '#02000C',
  marginBottom: '8px',
});

const ContactUsText = styled(Typography)({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#000',
  marginBottom: '24px',
});

const ContactModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ContactModalContainer>
      <CloseButton onClick={onClose}>
        <CloseIcon />
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
    </ContactModalContainer>
  );
};

export default ContactModal;
