import React, { useState } from 'react';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  styled,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAddress,
  setAddress,
} from '../../components/store/locationSlice';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import { AppDispatch } from '../../components/store/store';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginRight: theme.spacing(4),
  '.MuiRadio-root': {
    color: '#6E6E73',
    '&.Mui-checked': {
      color: '#007BFF',
    },
  },
  '.MuiTypography-root': {
    fontWeight: 500,
    fontSize: '16px',
    color: '#02000C',
  },
}));

const AddressSelection: React.FC = () => {
  const address = useSelector(selectAddress);
  const dispatch = useDispatch<AppDispatch>();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'delivery' && !address) {
      setShowLocationModal(true);
    }
  };

  const handleLocationSave = (newAddress: string) => {
    dispatch(setAddress(newAddress)); // 保存地址到 Redux
    setShowLocationModal(false); // 隐藏 LocationModal
  };

  return (
    <Box sx={{ mb: 4 }}>
      <RadioGroup row defaultValue="delivery" onChange={handleAddressChange}>
        <StyledFormControlLabel
          value="delivery"
          control={<Radio />}
          label={`Deliver to ${address || 'your location'}`}
        />
        <StyledFormControlLabel
          value="pickup"
          control={<Radio />}
          label="Pick up at Toronto Downtown"
        />
      </RadioGroup>

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSave={handleLocationSave}
        />
      )}
    </Box>
  );
};

export default AddressSelection;
