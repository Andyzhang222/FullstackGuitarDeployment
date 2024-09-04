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
  width: '365px', // 调整为适合的宽度
  height: '102px',
});

const StyledLabelText = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: '#02000C',
  marginLeft: '8px',
  whiteSpace: 'nowrap', // 禁止换行
  overflow: 'hidden', // 隐藏超出部分
  textOverflow: 'ellipsis', // 超出部分显示省略号
  maxWidth: '240px', // 限制最大宽度以保持布局
});

const StyledSubText = styled(Typography)({
  fontSize: '12px',
  color: '#76757C',
  marginTop: '4px',
});

const StyledRadio = styled(Radio)({
  color: '#000', // 默认颜色
  '&.Mui-checked': {
    color: '#000', // 选中时的颜色
  },
});

const AddressSelection: React.FC = () => {
  const address = useSelector(selectAddress);
  const dispatch = useDispatch<AppDispatch>();
  const [showLocationModal, setShowLocationModal] = React.useState(false);

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
        sx={{ gap: '16px' }} // 保持16px的间隔
      >
        <AddressSelectionContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledRadio value="delivery" />
            <TruckIcon /> {/* 使用本地卡车图标 */}
            <Box>
              <StyledLabelText>
                Deliver to {address || 'M5G2G4'}
              </StyledLabelText>
              {address && (
                <StyledSubText>
                  $30 Shipping, Get it by Sat, Jul 27
                </StyledSubText>
              )}
            </Box>
          </Box>
        </AddressSelectionContainer>

        <AddressSelectionContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledRadio value="pickup" />
            <ShopIcon /> {/* 使用本地商店图标 */}
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
