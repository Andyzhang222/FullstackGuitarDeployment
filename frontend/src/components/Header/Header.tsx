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
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  navLinks: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    marginRight: theme.spacing(4),
    cursor: 'pointer',
  },
  signInButton: {
    backgroundColor: '#FF416C',
    backgroundImage: 'linear-gradient(to right, #FF4B2B, #FF416C)',
    color: '#fff',
    borderRadius: '20px',
    padding: '5px 20px',
    textTransform: 'none',
  },
}));

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
        const decoded: DecodedToken = jwtDecode(idToken);
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
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.title}>
          <img
            src="/path/to/logo.png" // 替换成你自己的logo路径
            alt="Site Logo"
            className={classes.logo}
          />
          <Typography variant="h6">SiteLogo</Typography>
        </div>
        <div className={classes.navLinks}>
          <Typography
            variant="body1"
            className={classes.navLink}
            onClick={() => navigate('/about')}
          >
            About
          </Typography>
          <Typography
            variant="body1"
            className={classes.navLink}
            onClick={() => navigate('/features')}
          >
            Features
          </Typography>
          <Typography
            variant="body1"
            className={classes.navLink}
            onClick={() => navigate('/pricing')}
          >
            Pricing
          </Typography>
          <Typography
            variant="body1"
            className={classes.navLink}
            onClick={() => navigate('/gallery')}
          >
            Gallery
          </Typography>
          <Typography
            variant="body1"
            className={classes.navLink}
            onClick={() => navigate('/team')}
          >
            Team
          </Typography>
        </div>
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
          <Button
            className={classes.signInButton}
            onClick={() => navigate('/')}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
