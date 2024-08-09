import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import ContactModal from '../RightSideInfoComponents/ContactModal';
import PickUpModal from '../RightSideInfoComponents/PickUpModal';

const GlobalHeader = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [address, setAddress] = useState('Deliver to');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPickUpModal, setShowPickUpModal] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const handleToggleModal = () => {
    setShowLocationModal(!showLocationModal);
  };

  const handleContactToggleModal = () => {
    setShowContactModal(!showContactModal);
  };

  const handlePickUpToggleModal = () => {
    setShowPickUpModal(!showPickUpModal);
  };

  const handleSaveAddress = (newAddress: string) => {
    setAddress(newAddress);
    localStorage.setItem('address', newAddress);
    setShowLocationModal(false);
  };

  const isAddressSet = address !== 'Deliver to';

  return (
    <Box
      sx={{
        width: '100%',
        height: '48px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '0 72px',
        boxSizing: 'border-box',
        position: 'relative',
        borderBottom: '1px solid #DDDCDE', // 添加底部的灰色线条
      }}
    >
      <Grid
        container
        sx={{
          width: '1300px',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'gray',
          alignItems: 'center', // 确保垂直方向居中对齐
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'nowrap', // 禁止换行
          }}
        >
          <Button
            sx={{
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
          >
            <Typography variant="body1">Classical Guitar</Typography>
          </Button>
          <Button
            sx={{
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
          >
            <Typography variant="body1">Acoustic Guitar</Typography>
          </Button>
          <Button
            sx={{
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
          >
            <Typography variant="body1">Semi-Acoustic Guitar</Typography>
          </Button>
          <Button
            sx={{
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
          >
            <Typography variant="body1">Ukulele</Typography>
          </Button>
          <Button
            sx={{
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
          >
            <Typography variant="body1">Banjo</Typography>
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
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
              minWidth: 'fit-content',
            }}
            onClick={handleToggleModal}
          >
            <img src="/images/Header/truck.svg" alt="Delivery Icon" />
            <Typography
              variant="body1"
              sx={{
                color: isAddressSet ? '#007BFF' : '#000',
                textDecoration: isAddressSet ? 'underline' : 'none',
              }}
            >
              {address}
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
              minWidth: 'fit-content',
            }}
            onClick={handlePickUpToggleModal}
          >
            <img src="/images/Header/shop.svg" alt="Pickup Icon" />
            <Typography variant="body1">Pick up at Halifax Downtown</Typography>
          </Button>

          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#000000',
              textTransform: 'none',
              minWidth: 'fit-content',
            }}
            onClick={handleContactToggleModal}
          >
            <img src="/images/Header/phone.svg" alt="Contact Icon" />
            <Typography variant="body1">Contact Us</Typography>
          </Button>
        </Grid>
      </Grid>

      {showLocationModal && (
        <LocationModal onClose={handleToggleModal} onSave={handleSaveAddress} />
      )}
      {showContactModal && <ContactModal onClose={handleContactToggleModal} />}
      {showPickUpModal && <PickUpModal onClose={handlePickUpToggleModal} />}
    </Box>
  );
};

export default GlobalHeader;
