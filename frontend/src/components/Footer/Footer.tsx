import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterStyled = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  position: 'fixed',
});

const Footer = () => {
  return (
    <FooterStyled color="primary">
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body1" color="inherit">
          © 2024 Fantasy. All rights reserved.
        </Typography>
      </Toolbar>
    </FooterStyled>
  );
};

export default Footer;
