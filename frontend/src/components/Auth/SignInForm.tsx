import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 添加错误状态
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

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text(); // 如果不是JSON格式，则以文本格式解析
      }

      console.log('Response data:', data); // 添加调试信息
      if (response.ok) {
        console.log('Tokens:', data);
        // 存储 tokens
        localStorage.setItem('accessToken', data.AccessToken);
        localStorage.setItem('idToken', data.IdToken);
        localStorage.setItem('refreshToken', data.RefreshToken);
        // 跳转到主页
        navigate('/home');
      } else {
        setError(data.message || data); // 设置错误信息
        console.error('Failed to sign in:', data.message || data);
      }
    } catch (error) {
      setError('An unknown error occurred. Please try again.'); // 设置未知错误信息
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
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
