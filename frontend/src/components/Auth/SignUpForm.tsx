import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  Box,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ellipseImage from '../../assets/images/Ellipse.svg';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface SignUpFormProps {
  onSwitch: () => void;
  onRegistrationSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSwitch,
  onRegistrationSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(true); // 默认可见
  const [open, setOpen] = useState(false);

  const handleClickShowUsername = () => {
    setShowUsername(!showUsername);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setErrorMessage('');
        setOpen(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(` ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server');
    }
  };

  const handleClose = () => {
    setOpen(false);
    onRegistrationSuccess();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      {' '}
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <img
          src={ellipseImage}
          alt="Ellipse"
          style={{
            width: '32px',
            height: '32px',
            marginBottom: '20px',
            fontSize: '14px',
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
        Register your account
      </Typography>
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
              {email && (
                <IconButton
                  aria-label="clear email"
                  onClick={() => setEmail('')}
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
                aria-label="toggle email visibility"
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
        Confirm Password
      </Typography>
      <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Confirm your password..."
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
              {confirmPassword && (
                <IconButton
                  aria-label="clear confirmPassword"
                  onClick={() => setConfirmPassword('')}
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
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
                size="small"
                style={{ fontSize: '20px' }}
                sx={{
                  fontSize: '20px',
                  transform: 'scale(0.7)', // 缩小图标的大小
                }}
              >
                {showConfirmPassword ? (
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
      </Box>
      <Box style={{ height: '48px', marginBottom: '2px', marginTop: '-28px' }}>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
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
          height: '32px',
          fontWeight: '700',
          backgroundColor: '#0057FE', // 设置按钮背景颜色为蓝色
          color: 'white', // 设置按钮字体颜色为白色
          textTransform: 'none', // 确保没有强制转换文本
          marginTop: '-10px',
        }}
      >
        Sign up
      </Button>
      <Button
        variant="outlined"
        fullWidth
        style={{
          width: '432px',
          height: '32px',
          textTransform: 'none', // 确保没有强制转换文本
          color: '#4E5969', // 设置按钮背景颜色为蓝色
          borderColor: 'rgba(0, 0, 0, 0.23)', // 设置边框颜色为默认的灰黑色
        }}
      >
        Continue as a guest
      </Button>
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography
          variant="body2"
          align="left"
          style={{
            marginTop: '16px',
            width: '432px',
            color: '#86909C',
          }}
        >
          {'Already have an account? '}
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
            Sign in
          </Link>
        </Typography>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been created successfully. Please sign in to
            continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default SignUpForm;
