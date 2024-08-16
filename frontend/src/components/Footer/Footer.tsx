import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#02000C',
        color: '#FFFFFF',
        marginTop: '72px',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: '1600px', // 固定宽度为电脑端宽度
          margin: '0 auto', // 居中对齐
          padding: '40px 0', // 设置内边距
          boxSizing: 'border-box', // 确保边框和内边距包含在宽度和高度内
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {' '}
            {/* 确保各列宽度在手机和电脑端一致 */}
            <Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: '8px', color: 'white' }}
            >
              Feel free to contact us if you need more information about our
              guitars or any of our services.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '4px' }}>
              <strong>Contact number:</strong> 647-555-325
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '4px' }}>
              <strong>Email:</strong>{' '}
              <Link
                href="mailto:guitar123@guitar.com"
                sx={{ color: '#FFFFFF', textDecoration: 'none' }}
              >
                guitar123@guitar.com
              </Link>
            </Typography>
            <Typography variant="body2">
              <strong>Available hours:</strong> Mon - Fri, 10:00 am - 10:00 pm
              (EST) <br />
              Sat - Sun, 10:00 am - 6:00 pm (EST)
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Store Address
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: '8px', color: 'white' }}
            >
              Visit our store to pick up your guitar.
            </Typography>
            <Typography variant="body2">
              <strong>382 Yonge Street, Halifax</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Follow Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: '8px', color: 'white' }}
            >
              Stay connected through our social channels.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Facebook
              </Link>
              <Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Twitter
              </Link>
              <Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
