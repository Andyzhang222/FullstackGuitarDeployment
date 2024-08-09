import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { jwtDecode } from 'jwt-decode'; // 导入 jwtDecode
import theme from '../../theme/theme';
import { BodyText, LogoName, BodyRegular } from '../../theme/customStyles';

// Styled Components
const PageHeader = styled(AppBar)({
  backgroundColor: '#02000C',
  width: '100%',
  maxWidth: '1600px',
  padding: '16px, 72px, 16px, 72px',
  maxHeight: '72px',
  boxSizing: 'border-box',
  color: theme.palette.common.black,
});

const LayoutBlocks = styled('div')({
  width: '1300px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
});

const SearchBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderRadius: '5px',
  width: '800px',
  height: '40px',
  boxSizing: 'border-box',
  background: '#FFFFFF',
});

const SearchInput = styled('input')({
  width: '221.79px',
  height: '24px',
  border: 'none',
  outline: 'none',
  flex: 1,
});

const SignInContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '103px',
  height: '32px',
  gap: '8px',
  cursor: 'pointer',
});

const CartContainer = styled('div')({
  width: '87px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'flex-end',
});

interface DecodedToken {
  email: string;
  [key: string]: unknown;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserEmail('');
    handleClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <PageHeader position="static">
      <Toolbar>
        <LayoutBlocks>
          <LogoName>Logo Name</LogoName>
          <SearchBarContainer>
            <IconButton>
              <img src="/images/Header/vector.svg" alt="Search Icon" />
            </IconButton>
            <SearchInput
              placeholder="Find guitars you love..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown} // 监听回车键
              style={{
                fontFamily: 'Roboto, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                textAlign: 'left',
                color: '#595959',
              }}
            />
            <BodyRegular></BodyRegular>
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
                    <BodyText> Profile</BodyText>
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
              <SignInContainer onClick={() => navigate('/sign')}>
                <img src="/images/Header/User.svg" alt="User Icon" />
                <BodyText>Sign in</BodyText>
              </SignInContainer>
            )}
            <CartContainer>
              <img src="/images/Header/ShoppingCart.svg" alt="Cart Icon" />
              <BodyText>Cart</BodyText>
            </CartContainer>
          </div>
        </LayoutBlocks>
      </Toolbar>
    </PageHeader>
  );
};

export default Header;
