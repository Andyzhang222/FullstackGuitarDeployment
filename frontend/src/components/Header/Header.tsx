import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { jwtDecode } from 'jwt-decode';
import theme from '../../theme/theme'; // Import your custom theme

// Styled Components
const PageHeader = styled(AppBar)({
  backgroundColor: '#FFFFFF',
  width: '100%',
  maxWidth: '1600px',
  padding: '16px, 72px, 16px, 72px',
  margin: '0 auto',
  maxHeight: '72px',
  boxSizing: 'border-box',
  // Applying default font styling and color
  ...theme.typography.body1,
  color: theme.palette.common.black, // Using custom black color
});

const LayoutBlocks = styled('div')({
  width: '1296px',
  height: '40px',
  // background: 'red', // For visibility, remove or change as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto', // Centers the container horizontally
});

const LogoName = styled('div')({
  ...theme.typography.h6, // Apply typography styles from theme
  cursor: 'pointer',
});

const SearchBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.text.primary}`,
  padding: '5px',
  borderRadius: '5px',
  width: '800px',
  height: '40px', // Set explicit height
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  // background: 'green',
});

const SearchInput = styled('input')({
  width: '221.79px',
  height: '24px', // Set explicit height
  top: '24',
  border: 'none',
  outline: 'none',
  flex: 1,
  ...theme.typography.body1, // Apply body1 typography styles
});

const SignInContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '103px',
  height: '32px',
  gap: '8px',
  cursor: 'pointer',
  // background: 'green',
  marginRight: '50px', // Move left by half the distance
});

const CartContainer = styled('div')({
  width: '87px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  // background: 'green',
});

// Interface for decoded token
interface DecodedToken {
  email: string;
  [key: string]: unknown;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      try {
        const decoded: DecodedToken = jwtDecode(idToken);
        setUserEmail(decoded.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear tokens and user info
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserEmail('');
    handleClose();
  };

  return (
    <PageHeader position="static">
      <Toolbar>
        <LayoutBlocks>
          <LogoName onClick={() => navigate('/')}>Logo Name</LogoName>
          <SearchBarContainer>
            <IconButton>
              <img src="/images/Header/vector.svg" alt="Search Icon" />
            </IconButton>
            <SearchInput placeholder="Find guitars you love..." />
          </SearchBarContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <SignInContainer>
                  <IconButton
                    edge="end"
                    aria-label="current user account"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <img src="/images/Header/User.svg" alt="User Icon" />
                    <Typography variant="body1">Profile</Typography>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem disabled>{userEmail}</MenuItem>
                    <MenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </SignInContainer>
              </>
            ) : (
              <SignInContainer onClick={() => navigate('/')}>
                <img src="/images/Header/User.svg" alt="User Icon" />
                <Typography variant="body1">Sign In</Typography>
              </SignInContainer>
            )}
            <CartContainer>
              <img src="/images/Header/ShoppingCart.svg" alt="Cart Icon" />
              <Typography variant="body1">Cart</Typography>
            </CartContainer>
          </div>
        </LayoutBlocks>
      </Toolbar>
    </PageHeader>
  );
};

export default Header;
