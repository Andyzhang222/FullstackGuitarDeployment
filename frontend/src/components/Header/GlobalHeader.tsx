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

  // 截断地址到前15个字符
  const truncatedAddress = isAddressSet
    ? `${address.substring(0, 15)}...`
    : address;

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
        borderBottom: '1px solid #DDDCDE', // 添加底部的灰色线
      }}
    >
      <Grid
        container
        sx={{
          width: '100%',
          maxWidth: '1300px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap', // 禁止换行
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
            gap: '24px',
            minWidth: 0, // 防止因内容过多导致的溢出
            flexShrink: 1, // 防止地址部分占用过多空间
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
              maxWidth: '150px', // 设置最大宽度
              overflow: 'hidden', // 隐藏溢出部分
              textOverflow: 'ellipsis', // 超出部分显示省略号
              whiteSpace: 'nowrap', // 禁止换行
              flexShrink: 1, // 防止占用过多空间
            }}
            onClick={handleToggleModal}
          >
            <img src="/images/Header/truck.svg" alt="Delivery Icon" />
            <Typography
              variant="body1"
              sx={{
                color: isAddressSet ? '#02000C' : '#000',
                textDecoration: isAddressSet ? 'underline' : 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
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
              minWidth: 'fit-content',
            }}
            onClick={handlePickUpToggleModal}
          >
            <img src="/images/Header/shop.svg" alt="Pickup Icon" />
            <Typography variant="body1">Pick up at Halifax </Typography>
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
