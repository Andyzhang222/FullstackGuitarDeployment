import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    justifyContent: 'center',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.footer}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body1" color="inherit">
          © 2024 Fantasy. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
