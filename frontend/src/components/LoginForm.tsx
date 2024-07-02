import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure AWS Amplify
Auth.configure(awsconfig);

// Create a theme for MUI
const theme = createTheme();

interface LoginFormProps {
  closeModal: () => void;
}

// LoginForm component
const LoginForm: React.FC<LoginFormProps> = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Add useNavigate hook for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const user = await Auth.signIn(username, password);
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const refreshToken = user.signInUserSession.refreshToken.token;


      // Send tokens to the backend
      await axios.post('http://localhost:3001/login', {
        idToken,
        accessToken,
        refreshToken
      });

      setMessage('User logged in successfully!');
      closeModal(); // Close modal and redirect to the main page

      // Redirect to login success page
      navigate('/login-success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Welcome to Fantasy
          </Typography>
          <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
            Welcome Back! Please enter your details.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              Continue as a guest
            </Button>
            {message && <Typography color="error" variant="body2">{message}</Typography>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;