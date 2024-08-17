import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface RightSideButtonsProps {
  truncatedAddress: string;
  isAddressSet: boolean;
  handleToggleModal: () => void;
  handlePickUpToggleModal: () => void;
  handleContactToggleModal: () => void;
}

const RightSideButtons: React.FC<RightSideButtonsProps> = ({
  truncatedAddress,
  isAddressSet,
  handleToggleModal,
  handlePickUpToggleModal,
  handleContactToggleModal,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        justifyContent: 'flex-end', // 将按钮右对齐
        width: '650px',
      }}
    >
      <Button
        sx={{
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
        }}
        onClick={handleToggleModal}
      >
        <img src="/images/Header/truck.svg" alt="Delivery Icon" />
        <Typography
          variant="body1"
          sx={{
            color: isAddressSet ? '#02000C' : '#000',
            textDecoration: isAddressSet ? 'underline' : 'none',
          }}
        >
          {truncatedAddress}
        </Typography>
      </Button>

      <Button
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#000000',
          textTransform: 'none',
        }}
        onClick={handlePickUpToggleModal}
      >
        <img src="/images/Header/Shop.svg" alt="Pickup Icon" />
        <Typography variant="body1">Halifax</Typography>
      </Button>

      <Button
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#000000',
          textTransform: 'none',
        }}
        onClick={handleContactToggleModal}
      >
        <img src="/images/Header/Phone.svg" alt="Contact Icon" />
        <Typography variant="body1">Contact Us</Typography>
      </Button>
    </Box>
  );
};

export default RightSideButtons;
