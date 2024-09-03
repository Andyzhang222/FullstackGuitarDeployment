import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import ContactModal from '../RightSideInfoComponents/ContactModal';
import PickUpModal from '../RightSideInfoComponents/PickUpModal';
import CategoryMenu from './CategoryMenu';
import {
  selectAddress,
  setAddress,
} from '../../components/store/locationSlice'; // Import Redux actions and selectors
import { AppDispatch } from '../../components/store/store'; // Import AppDispatch

const GlobalHeader: React.FC = () => {
  const address = useSelector(selectAddress); // Get the address from Redux
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPickUpModal, setShowPickUpModal] = useState(false);

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
    dispatch(setAddress(newAddress)); // Save the address to Redux
    setShowLocationModal(false);
  };

  const isAddressSet = address !== '';
  const truncatedAddress = isAddressSet
    ? `${address.substring(0, 15)}...`
    : 'Deliver to your location';

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
        borderBottom: '1px solid #DDDCDE',
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
          flexWrap: 'nowrap',
        }}
      >
        {/* CategoryMenu Component */}
        <CategoryMenu />

        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            minWidth: 0,
            flexShrink: 1,
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
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexShrink: 1,
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
            <Typography variant="body1">Pick up at Halifax</Typography>
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
