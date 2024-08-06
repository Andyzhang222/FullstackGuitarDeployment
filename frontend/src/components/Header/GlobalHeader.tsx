import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { BodyRegular } from '../../theme/customStyles';
import LocationModal from '../LocationModal';
import ContactModal from '../ContactModal';
import PickUpModal from '../PickUpModal';

const GlobalHeaderContainer = styled('div')({
  width: '100%',
  height: '48px',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  padding: '0 72px',
  boxSizing: 'border-box',
  position: 'relative',
});

const ContentWrapper = styled('div')({
  width: '1300px',
  display: 'flex',
  justifyContent: 'space-between',
  color: 'gray',
});

const NavItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: '#000000',
  width: '33.33%', // 固定宽度
});

const LeftContainer = styled('div')({
  width: '650px',
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
});

const RightContainer = styled('div')({
  width: '650px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

// 为设置过的地址添加样式
const AddressText = styled(BodyRegular)<{ isSet: boolean }>(({ isSet }) => ({
  color: isSet ? '#007BFF' : '#000', // 已设置的地址使用蓝色
  textDecoration: isSet ? 'underline' : 'none', // 已设置的地址带下划线
}));

const GlobalHeader = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [address, setAddress] = useState('Deliver to');

  const [showContactModal, setShowContactModal] = useState(false);
  const [showPickUpModal, setShowPickUpModal] = useState(false);

  // 在组件加载时从localStorage中读取地址
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
    localStorage.setItem('address', newAddress); // 将地址保存到localStorage
    setShowLocationModal(false);
  };

  const isAddressSet = address !== 'Deliver to';

  return (
    <GlobalHeaderContainer>
      <ContentWrapper>
        <LeftContainer>
          <NavItem>
            <BodyRegular>Classical Guitar</BodyRegular>
          </NavItem>
          <NavItem>
            <BodyRegular>Acoustic Guitar</BodyRegular>
          </NavItem>
          <NavItem>
            <BodyRegular>Semi-Acoustic Guitar</BodyRegular>
          </NavItem>
          <NavItem>
            <BodyRegular>Ukulele</BodyRegular>
          </NavItem>
          <NavItem>
            <BodyRegular>Banjo</BodyRegular>
          </NavItem>
        </LeftContainer>
        <RightContainer>
          <NavItem onClick={handleToggleModal}>
            <img src="/images/Header/truck.svg" alt="Delivery Icon" />
            <AddressText isSet={isAddressSet}>{address}</AddressText>
          </NavItem>

          <NavItem onClick={handleContactToggleModal}>
            <img src="/images/Header/phone.svg" alt="Contact Icon" />
            <BodyRegular>Contact Us</BodyRegular>
          </NavItem>

          <NavItem onClick={handlePickUpToggleModal}>
            <img src="/images/Header/shop.svg" alt="Pickup Icon" />
            <BodyRegular>Pick up at Halifax Downtown</BodyRegular>
          </NavItem>
        </RightContainer>
      </ContentWrapper>
      {showLocationModal && (
        <LocationModal onClose={handleToggleModal} onSave={handleSaveAddress} />
      )}

      {showContactModal && <ContactModal onClose={handleContactToggleModal} />}

      {showPickUpModal && <PickUpModal onClose={handlePickUpToggleModal} />}
    </GlobalHeaderContainer>
  );
};

export default GlobalHeader;
