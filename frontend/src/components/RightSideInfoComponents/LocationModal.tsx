import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { styled } from '@mui/system';

const LocationModalContainer = styled(Box)({
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
  justifyContent: 'space-between',
});

const ContentContainer = styled(Box)({
  padding: '24px',
  overflowY: 'auto',
});

const ButtonContainer = styled(Box)({
  padding: '16px 24px',
  borderTop: '1px solid #f0f0f0',
  backgroundColor: '#fff',
});

const LocationModal: React.FC<{
  onClose: () => void;
  onSave: (newAddress: string) => void;
}> = ({ onClose, onSave }) => {
  const [address, setAddress] = useState('');

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddressFromCoords = (lat: number, lng: number) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // 从环境变量中获取API Key
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const fullAddress = data.results[0].formatted_address;
          setAddress(fullAddress);
        } else {
          console.error('No results found');
        }
      })
      .catch((error) => console.error('Error fetching address:', error));
  };

  const handleSave = () => {
    onSave(address);
  };

  return (
    <LocationModalContainer>
      <ContentContainer>
        <IconButton
          sx={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: '#000',
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '28px',
            color: '#02000C',
            marginBottom: '8px',
          }}
        >
          Use your location
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            color: '#76757C',
            marginBottom: '16px',
          }}
        >
          Enter your zip code to find out if we deliver to your area.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your zip code, e.g., M5G2G4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{
            height: '40px',
            marginBottom: '16px',
          }}
          inputProps={{
            style: { height: '40px', padding: '10px 12px' },
          }}
        />
        <Button
          variant="text"
          startIcon={<MyLocationIcon />}
          onClick={fetchCurrentLocation}
          sx={{
            color: '#02000C',
            marginBottom: '16px',
            textTransform: 'none',
          }}
        >
          My current location
        </Button>
      </ContentContainer>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          sx={{
            backgroundColor: '#02000C',
            color: '#FFFFFF',
            height: '48px',
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          Save
        </Button>
      </ButtonContainer>
    </LocationModalContainer>
  );
};

export default LocationModal;
