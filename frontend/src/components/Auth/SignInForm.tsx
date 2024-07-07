import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit} className="signin-form">
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome to Fantasy
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome Back! Please enter your details.
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter your email address..."
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter your password..."
      />
      <div className="form-options">
        <FormControlLabel
          control={<Checkbox name="remember" />}
          label="Remember me"
        />
        <Link href="#" className="forgot-password">
          Forgot password?
        </Link>
      </div>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="signin-button"
      >
        Sign in
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className="guest-button"
      >
        Continue as a guest
      </Button>
    </form>
  );
};

export default SignInForm;
