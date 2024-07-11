import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
} from '@material-ui/core';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

interface ForgotPasswordFormProps {
  onSwitchToSignIn: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setStep('reset');
  };

  const handleResendCode = async (event: React.FormEvent) => {
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
      const verificationCode = code.join('');
      const response = await fetch(
        'http://localhost:5001/auth/confirm-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            code: verificationCode,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage('Password reset successful. You can now sign in.');
        setShowSuccessDialog(true);
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

  const handleCodeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== '' && index < 5) {
        (
          document.getElementById(`code-${index + 1}`) as HTMLInputElement
        ).focus();
      }
    }
  };

  return (
    <form className="forgot-password-form">
      {step === 'email' && (
        <>
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
                    >
                      <ClearOutlinedIcon style={{ fontSize: '20px' }} />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleSendCode}
            variant="contained"
            color="primary"
            fullWidth
          >
            Next
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={onSwitchToSignIn}
            style={{
              marginTop: '16px',
              display: 'block',
              textAlign: 'center',
            }}
          >
            Back to Sign In
          </Link>
        </>
      )}

      {step === 'reset' && (
        <>
          <Typography variant="h5" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            New Password
          </Typography>
          <TextField
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
          />
          <Typography variant="body1" gutterBottom>
            Confirm New Password
          </Typography>
          <TextField
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
          />
          <Typography variant="body1" gutterBottom>
            Verification Code
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="16px"
          >
            {code.map((digit, index) => (
              <TextField
                key={index}
                id={`code-${index}`}
                variant="outlined"
                required
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleCodeChange(e, index)
                }
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    width: '32px',
                    height: '32px',
                    padding: '0',
                  },
                }}
                style={{
                  marginRight: index < 5 ? '8px' : '0',
                }}
              />
            ))}
            <Button
              onClick={handleResendCode}
              variant="contained"
              color="primary"
              disabled={timer > 0}
              style={{
                flex: 1, // 占1份宽度
                height: '32px',
                marginBottom: '16px',
                marginLeft: '20px',
                backgroundColor: '#0057FE',
              }}
            >
              {timer > 0 ? `Resend Code in ${timer}s` : 'Send Code'}
            </Button>
          </Box>

          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px', backgroundColor: '#0057FE' }}
          >
            Reset Password
          </Button>
        </>
      )}

      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
      {step === 'reset' && (
        <Link
          component="button"
          variant="body2"
          onClick={() => setStep('email')}
          style={{
            marginTop: '16px',
            display: 'block',
            textAlign: 'center',
          }}
        >
          Back to Email Step
        </Link>
      )}

      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      >
        <DialogTitle>Password Reset Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password has been successfully reset. You can now sign in with
            your new password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              onSwitchToSignIn();
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default ForgotPasswordForm;
