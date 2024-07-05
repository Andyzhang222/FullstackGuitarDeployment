import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Tokens:', data);
        // 存储 tokens
        localStorage.setItem('accessToken', data.AccessToken);
        localStorage.setItem('idToken', data.IdToken);
        localStorage.setItem('refreshToken', data.RefreshToken);
        // 跳转到主页
        navigate('/home');
      } else {
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox name="remember" />}
        label="Remember me"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
