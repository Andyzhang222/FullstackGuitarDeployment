import React from 'react';
import { styled } from '@mui/system';
import { BodyRegular } from '../../theme/customStyles';

const GlobalHeaderContainer = styled('div')({
  width: '100%',
  height: '48px',
  backgroundColor: '#FFFFFF',
  //   borderBottom: '1px solid #F0F0F0',
  display: 'flex',
  justifyContent: 'center', // Center the ContentWrapper within the GlobalHeaderContainer
  margin: '0 auto',
  padding: '0 72px',
  boxSizing: 'border-box',
  position: 'relative',
  background: 'red',
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
  background: 'green',
});

const LeftContainer = styled('div')({
  width: '650px',
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  background: 'gray',
});

const RightContainer = styled('div')({
  width: '650px',
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  justifyContent: 'flex-end', // 设置内容向右对齐
  background: 'yellow',
});

const GlobalHeader = () => {
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
          <NavItem>
            <img src="/images/Header/truck.svg" alt="Delivery Icon" />
            <BodyRegular>Deliver to M5G2G4</BodyRegular>
          </NavItem>
          <NavItem>
            <img src="/images/Header/shop.svg" alt="Pickup Icon" />
            <BodyRegular>Pick up at Toronto Downtown</BodyRegular>
          </NavItem>
          <NavItem>
            <img src="/images/Header/phone.svg" alt="Contact Icon" />
            <BodyRegular>Contact Us</BodyRegular>
          </NavItem>
        </RightContainer>
      </ContentWrapper>
    </GlobalHeaderContainer>
  );
};

export default GlobalHeader;
