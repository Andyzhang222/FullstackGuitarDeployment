import React from 'react';
import { Box, Radio, RadioGroup, styled, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAddress,
  setAddress,
} from '../../components/store/locationSlice';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import { AppDispatch } from '../../components/store/store';

// 使用本地 SVG 图标
const TruckIcon = () => (
  <img
    src="/images/Header/truck.svg"
    alt="Truck Icon"
    style={{ width: '24px', height: '24px' }}
  />
);

const ShopIcon = () => (
  <img
    src="/images/Header/shop.svg"
    alt="Shop Icon"
    style={{ width: '24px', height: '24px' }}
  />
);

const AddressSelectionContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  marginBottom: '16px',
  width: '365px',
  height: '102px',
});

const StyledLabelText = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: '#02000C',
  marginLeft: '8px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '240px',
});

const StyledSubText = styled(Typography)({
  fontSize: '12px',
  color: '#76757C',
  marginTop: '4px',
});

const StyledRadio = styled(Radio)({
  color: '#000',
  '&.Mui-checked': {
    color: '#000',
  },
});

const AddressSelection: React.FC = () => {
  const address = useSelector(selectAddress);
  const dispatch = useDispatch<AppDispatch>();
  const [showLocationModal, setShowLocationModal] = React.useState(false);

  // 计算当前时间加一周
  const today = new Date();
  const nextWeek = new Date(today.setDate(today.getDate() + 7));
  const formattedDate = nextWeek.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

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
      <RadioGroup
        row
        defaultValue="delivery"
        onChange={handleAddressChange}
        sx={{ gap: '16px' }}
      >
        <AddressSelectionContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            {/* 确保图标和 "Deliver to" 在一行 */}
            <StyledRadio value="delivery" />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                {/* 卡车图标和第一行文本 */}
                <TruckIcon />
                <StyledLabelText>
                  Deliver to {address || 'your location'}
                </StyledLabelText>
              </Box>
              <StyledSubText sx={{ marginTop: '4px' }}>
                {' '}
                {/* 第二行文本 */}
                $30 Shipping, Get it by {formattedDate}
              </StyledSubText>
            </Box>
          </Box>
        </AddressSelectionContainer>

        <AddressSelectionContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledRadio value="pickup" />
            <ShopIcon />
            <StyledLabelText>Pick up at Toronto Downtown</StyledLabelText>
          </Box>
        </AddressSelectionContainer>
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
