import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

interface DecodedToken {
  email: string;
  [key: string]: unknown;
}

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // 检查用户是否登录
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(idToken);
        setUserEmail(decoded.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('无效的令牌', error);
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
    // 清除令牌和用户信息
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserEmail('');
    handleClose();
  };

  const handleOrders = () => {
    // 跳转到订单页面
    navigate('/orders');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Fantasy
        </Typography>
        {isLoggedIn ? (
          <div>
            <IconButton
              edge="end"
              aria-label="current user account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
              <MenuItem onClick={handleOrders}>Orders</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" onClick={() => navigate('/')}>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
