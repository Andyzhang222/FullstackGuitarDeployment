import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const ModalContainer = styled(Box)({
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

const CloseButton = styled(IconButton)({
  alignSelf: 'flex-end',
  color: '#02000C', // 确保关闭按钮为黑色
});

const PickUpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <ModalContainer>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <Typography variant="h6" sx={{ fontWeight: 500, color: '#02000C' }}>
        Pick up address
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#76757C', marginBottom: '16px' }}
      >
        Visit our store to pick up your guitar.
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', color: '#02000C' }}
      >
        Store address
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#02000C', marginBottom: '16px' }}
      >
        382 Yonge Street, Toronto
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', color: '#02000C' }}
      >
        Opening hours
      </Typography>
      <Typography variant="body1" sx={{ color: '#02000C' }}>
        Mon - Fri, 10:00 am - 10:00 pm (EST)
        <br />
        Sat - Sun, 10:00 am - 6:00pm (EST)
      </Typography>
    </ModalContainer>
  );
};

export default PickUpModal;
