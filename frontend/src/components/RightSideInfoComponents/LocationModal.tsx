import React from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { fetchAddressFromCoords } from '../../components/store/locationSlice';
import { AppDispatch } from '../../components/store/store'; // 引入 AppDispatch 类型

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
  const dispatch = useDispatch<AppDispatch>();
  const [address, setAddress] = React.useState('');

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchAddressFromCoords({ lat: latitude, lng: longitude }))
            .unwrap()
            .then((address) => setAddress(address))
            .catch((error) => console.error('Failed to fetch address:', error));
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSave = () => {
    onSave(address); // 通过回调函数传递地址
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
          onClick={handleSave} // 点击保存时，调用 handleSave
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
