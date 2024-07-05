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
} from '@material-ui/core';

const SignUpForm = ({
  onRegistrationSuccess,
}: {
  onRegistrationSuccess: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

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
        console.log('Registration successful');
        setErrorMessage(''); // 清除之前的错误信息
        setOpen(true); // 显示成功弹窗
      } else {
        const errorData: { errors?: { msg: string }[] } = await response.json();
        setErrorMessage(
          `Failed to register: ${errorData.errors ? errorData.errors.map((error) => error.msg).join(', ') : 'Unknown error'}`
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to connect to the server');
    }
  };

  const handleClose = () => {
    setOpen(false);
    onRegistrationSuccess(); // 通知父组件切换回登录组件
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox name="remember" />}
        label="Remember me"
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>

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
