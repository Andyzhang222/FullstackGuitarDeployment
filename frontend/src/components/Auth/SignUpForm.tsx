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
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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
        setErrorMessage('');
        setOpen(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `Failed to register: ${errorData.message || 'Unknown error'}`
        );
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
    <form onSubmit={handleSubmit} className="signup-form">
      <Typography variant="h4" component="h1" gutterBottom className="title">
        Welcome to Fantasy
      </Typography>
      <Typography variant="subtitle1" gutterBottom className="subtitle">
        Register your account
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter your email address..."
        className="input-field"
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
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
        className="input-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Confirm your password..."
        className="input-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox name="remember" />}
        label="Remember me"
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="signup-button"
      >
        Sign up
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className="guest-button"
      >
        Continue as a guest
      </Button>

      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="body2">
          {'Already have an account? '}
          <Link href="#" onClick={onSwitch}>
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
