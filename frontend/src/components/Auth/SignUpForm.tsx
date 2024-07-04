import React from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

const SignUpForm = () => {
  return (
    <form>
      <TextField label="Email" fullWidth margin="normal" required />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        required
      />
      <FormControlLabel
        control={<Checkbox name="remember" />}
        label="Remember me"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
