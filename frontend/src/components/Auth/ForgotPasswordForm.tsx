import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

interface ForgotPasswordFormProps {
  onSwitchToSignIn: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:5001/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email }),
        }
      );

      if (response.ok) {
        setMessage(
          'Verification code sent to your email. Please check your inbox.'
        );
        setTimer(60); // 设置 60 秒倒计时
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:5001/auth/confirm-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, code, newPassword }),
        }
      );

      if (response.ok) {
        setMessage('Password reset successful. You can now sign in.');
        onSwitchToSignIn();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <form className="forgot-password-form">
      <Typography variant="h5" component="h1" gutterBottom>
        Reset Password
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
      />
      <TextField
        label="Verification Code"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter the verification code"
      />
      <Button
        onClick={handleSendCode}
        variant="contained"
        color="primary"
        fullWidth
        disabled={timer > 0}
      >
        {timer > 0 ? `Resend Code in ${timer}s` : 'Send Verification Code'}
      </Button>
      <TextField
        label="New Password"
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
        type="password"
      />
      <TextField
        label="Confirm New Password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Confirm your new password"
        type="password"
      />
      <Button
        onClick={handleResetPassword}
        variant="contained"
        color="primary"
        fullWidth
      >
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
        onClick={(e) => {
          e.preventDefault();
          onSwitchToSignIn();
        }}
      >
        Back to Sign In
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
