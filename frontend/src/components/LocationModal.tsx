import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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
      <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6">Use your location</Typography>
      <Typography>
        Enter your zip code to find out if we deliver to your area.
      </Typography>
      <TextField
        label="Enter your zip code, e.g., M5G2G4"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button variant="contained" onClick={fetchCurrentLocation}>
        My current location
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </LocationModalContainer>
  );
};

export default LocationModal;
