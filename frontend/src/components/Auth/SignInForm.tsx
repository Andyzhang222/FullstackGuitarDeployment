import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ellipseImage from '../../assets/images/Ellipse.svg';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface SignInFormProps {
  onSwitch: () => void;
  onSwitchToForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSwitch,
  onSwitchToForgotPassword,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // 添加错误状态
  const [showPassword, setShowPassword] = useState(false); // 管理密码可见状态
  const [showUsername, setShowUsername] = useState(true); // 管理用户名可见状态
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
          navigate('/');
        } else {
          setError('Failed to receive tokens. Please try again.');
          setPassword(''); // 清空密码字段
        }
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || 'An error occurred while signing in';
        setError(errorMessage);
        setPassword(''); // 清空密码字段
      }
    } catch (error) {
      setError('An unknown error occurred. Please try again.');
      setPassword(''); // 清空密码字段
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowUsername = () => {
    setShowUsername(!showUsername);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="signin-form"
      style={{
        width: '432px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // 向左对齐
        maxHeight: '100vh',
        fontFamily: 'Helvetica',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <img
          src={ellipseImage}
          alt="Ellipse"
          style={{
            width: '32px',
            height: '32px',
            marginBottom: '10px',
          }}
        />
      </Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        style={{
          marginBottom: '5px',
          textAlign: 'left',
          width: '432px',
          fontSize: '28px',
          fontWeight: '700',
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
          fontFamily: 'PingFang SC',
          fontWeight: '400',
          fontSize: '16px',
          color: '#4E5969',
        }}
      >
        Welcome Back! Please enter your details.
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        fontWeight="700"
        fontSize="14px"
      >
        <Typography
          variant="body2"
          align="left"
          style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
          }}
        >
          Email
        </Typography>
        <TextField
          type={showUsername ? 'text' : 'password'}
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
          }}
          inputProps={{
            style: {
              height: '32px',
              padding: '0 14px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {username && (
                  <IconButton
                    aria-label="clear email"
                    onClick={() => setUsername('')}
                    edge="end"
                    size="small"
                    style={{ fontSize: '20px' }}
                    sx={{
                      fontSize: '20px',
                      transform: 'scale(0.7)', // 缩小图标的大小
                    }}
                  >
                    <ClearOutlinedIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                )}
                <IconButton
                  aria-label="toggle username visibility"
                  onClick={handleClickShowUsername}
                  edge="end"
                  size="small"
                  style={{ fontSize: '20px' }}
                  sx={{
                    fontSize: '20px',
                    transform: 'scale(0.7)', // 缩小图标的大小
                  }}
                >
                  {showUsername ? (
                    <VisibilityOutlinedIcon style={{ fontSize: '20px' }} />
                  ) : (
                    <VisibilityOffOutlinedIcon style={{ fontSize: '20px' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="body2"
          align="left"
          style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
          }}
        >
          Password
        </Typography>
        <TextField
          type={showPassword ? 'text' : 'password'}
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
          }}
          inputProps={{
            style: {
              height: '32px',
              padding: '0 14px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password && (
                  <IconButton
                    aria-label="clear password"
                    onClick={() => setPassword('')}
                    edge="end"
                    size="small"
                    style={{ fontSize: '20px' }}
                    sx={{
                      fontSize: '20px',
                      transform: 'scale(0.7)', // 缩小图标的大小
                    }}
                  >
                    <ClearOutlinedIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                )}
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="small"
                  style={{ fontSize: '20px' }}
                  sx={{
                    fontSize: '20px',
                    transform: 'scale(0.7)', // 缩小图标的大小
                  }}
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon style={{ fontSize: '20px' }} />
                  ) : (
                    <VisibilityOffOutlinedIcon style={{ fontSize: '20px' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center" // 这里添加 alignItems 属性
          width="100%"
          maxWidth={432}
          mb={2}
          sx={{
            marginTop: '-15px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                sx={{
                  transform: 'scale(0.7)', // 缩小复选框的大小
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                }}
              />
            }
            label="Remember me"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '14px',
                color: '#4E5969',
                marginLeft: '-10px',
              },
            }}
          />
          <Link
            href="#"
            className="forgot-password"
            sx={{
              fontSize: '14px',
              color: '#4E5969',
              fontWeight: '400',
            }}
            onClick={(e) => {
              e.preventDefault();
              onSwitchToForgotPassword(); // 调用传递过来的 handleForgotPassword 函数
            }}
          >
            Forgot password?
          </Link>
        </Box>
        <Box
          style={{ height: '24px', marginBottom: '2px', marginTop: '-10px' }}
        >
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
            marginBottom: '22px',
            width: '432px',
            height: '40px',
            fontWeight: '700',
            backgroundColor: '#0057FE', // 设置按钮背景颜色为蓝色
            color: 'white', // 设置按钮字体颜色为白色
            textTransform: 'none', // 确保没有强制转换文本
            borderRadius: '4px',
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
            fontWeight: '700',
            fontFamily: 'PingFang SC',
            textTransform: 'none', // 确保没有强制转换文本
            color: '#4E5969', // 设置按钮背景颜色为蓝色
            borderColor: 'rgba(0, 0, 0, 0.23)', // 设置边框颜色为默认的灰黑色
            borderRadius: '4px',
          }}
          onClick={() => navigate('/')} // 添加这个onClick事件处理程序
        >
          Continue as a guest
        </Button>
        <Typography
          variant="body2"
          align="left"
          style={{
            marginTop: '16px',
            width: '432px',
            color: '#86909C',
          }}
        >
          {"Don't have an account? "}
          <Link
            href="#"
            onClick={onSwitch}
            style={{
              marginLeft: '3px',
              color: '#0057FE', // 设置按钮背景颜色为蓝色
              fontWeight: '400',
              textDecoration: 'none', // 去掉下划线
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default SignInForm;
