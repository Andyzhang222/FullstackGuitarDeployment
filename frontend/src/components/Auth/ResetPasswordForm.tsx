import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

interface ResetPasswordFormProps {
  email: string;
  verificationCode: string;
  onSwitchToSignIn: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  verificationCode,
  onSwitchToSignIn,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:5001/auth/confirm-forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, verificationCode, newPassword }),
        }
      );

      if (response.ok) {
        setMessage(
          'Password has been reset successfully. You can now sign in with your new password.'
        );
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" gutterBottom>
        Reset Password
      </Typography>
      <TextField
        label="New Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter your new password"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Reset Password
      </Button>
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        style={{ marginTop: '16px' }}
        onClick={onSwitchToSignIn}
      >
        Back to Sign In
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
