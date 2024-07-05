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

      console.log('Response status:', response.status); // 打印响应状态码
      console.log('Response headers:', response.headers); // 打印响应头

      if (response.ok) {
        const data = await response.json();
        console.log('Tokens:', data);
        // 确保我们确实收到了所需的三个 token
        if (data.AccessToken && data.IdToken && data.RefreshToken) {
          // 存储 tokens
          localStorage.setItem('accessToken', data.AccessToken);
          localStorage.setItem('idToken', data.IdToken);
          localStorage.setItem('refreshToken', data.RefreshToken);
          // 跳转到主页
          navigate('/home');
        } else {
          console.error('Missing tokens in response:', data);
          setError('Failed to receive tokens. Please try again.');
        }
      } else {
        console.log('Parsing error response'); // 添加日志
        const errorData = await response.json();
        console.log('Received error data:', errorData); // 打印接收到的错误数据
        const errorMessage =
          errorData.message || 'An error occurred while signing in';
        setError(errorMessage); // 设置错误信息
        console.error('Failed to sign in:', errorMessage);
      }
    } catch (error) {
      console.error('An error occurred in catch block:', error); // 更详细的错误日志
      setError('An unknown error occurred. Please try again.'); // 设置未知错误信息
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
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
