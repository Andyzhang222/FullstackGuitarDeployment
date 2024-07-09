import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ellipseImage from '../../assets/images/Ellipse.svg';

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // 添加错误状态
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // 提交前清除错误信息
    try {
      const response = await fetch('http://localhost:5001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.AccessToken && data.IdToken && data.RefreshToken) {
          localStorage.setItem('accessToken', data.AccessToken);
          localStorage.setItem('idToken', data.IdToken);
          localStorage.setItem('refreshToken', data.RefreshToken);
          navigate('/home');
        } else {
          setError('Failed to receive tokens. Please try again.');
        }
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || 'An error occurred while signing in';
        setError(errorMessage);
      }
    } catch (error) {
      setError('An unknown error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="signin-form"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '100vh',
        backgroundColor: '#f0f0f0', // 这里添加背景颜色
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <img
          src={ellipseImage}
          alt="Ellipse"
          style={{
            width: '32px',
            height: '32px',
            marginBottom: '20px',
            marginLeft: '30px', // 向左移动以对齐
          }}
        />
      </Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        style={{
          marginBottom: '10px',
          textAlign: 'left',
          width: '432px',
        }}
      >
        Welcome to Fantasy
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{
          marginBottom: '30px',
          textAlign: 'left',
          width: '432px',
        }}
      >
        Welcome Back! Please enter your details.
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Typography
          variant="body2"
          align="left"
          style={{
            marginBottom: '8px',
            width: '432px',
          }}
        >
          Email
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter your email address..."
          style={{
            marginBottom: '16px',
            width: '432px',
            height: '32px',
            border: '1px solid #E5E6EB',
          }}
          inputProps={{
            style: {
              height: '32px',
              padding: '0 14px',
            },
          }}
        />
        <Typography
          variant="body2"
          align="left"
          style={{
            marginBottom: '8px',
            width: '432px',
          }}
        >
          Password
        </Typography>
        <TextField
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter your password..."
          style={{
            marginBottom: '16px',
            width: '432px',
            height: '32px',
            border: '1px solid #E5E6EB',
          }}
          inputProps={{
            style: {
              height: '32px',
              padding: '0 14px',
            },
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          maxWidth={432}
          mb={2}
        >
          <FormControlLabel
            control={<Checkbox name="remember" />}
            label="Remember me"
          />
          <Link href="#" className="forgot-password">
            Forgot password?
          </Link>
        </Box>
        {error && (
          <Typography
            color="error"
            variant="body2"
            style={{ marginBottom: '16px' }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
            marginBottom: '16px',
            width: '432px',
            height: '40px',
            backgroundColor: '#0057FE',
            color: 'white',
          }}
        >
          Sign in
        </Button>
        <Button
          variant="outlined"
          fullWidth
          style={{
            marginBottom: '16px',
            width: '432px',
            height: '40px',
          }}
        >
          Continue as a guest
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;
