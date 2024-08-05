import React, { useState } from 'react';
import { styled } from '@mui/system';
import { BodyRegular } from '../../theme/customStyles';
import LocationModal from '../LocationModal';

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
  border: '2px solid yellow', // 可用于调试，完成后可移除
});

const GlobalHeader = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [address, setAddress] = useState('Deliver to');

  const handleToggleModal = () => {
    setShowLocationModal(!showLocationModal);
  };

  const handleSaveAddress = (newAddress: string) => {
    setAddress(newAddress);
    setShowLocationModal(false);
  };

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
            <BodyRegular>{address}</BodyRegular>
          </NavItem>

          <NavItem>
            <img src="/images/Header/phone.svg" alt="Contact Icon" />
            <BodyRegular>Contact Us</BodyRegular>
          </NavItem>

          <NavItem>
            <img src="/images/Header/shop.svg" alt="Pickup Icon" />
            <BodyRegular>Pick up at Toronto Downtown</BodyRegular>
          </NavItem>
        </RightContainer>
      </ContentWrapper>
      {showLocationModal && (
        <LocationModal onClose={handleToggleModal} onSave={handleSaveAddress} />
      )}
    </GlobalHeaderContainer>
  );
};

export default GlobalHeader;
