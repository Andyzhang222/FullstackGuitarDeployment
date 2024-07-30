import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

interface VerifyCodeFormProps {
  email: string;
  onSwitchToResetPassword: (code: string) => void; // 确保 onSwitchToResetPassword 接受一个字符串参数
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({ email, onSwitchToResetPassword }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // 验证验证码的逻辑，这里可以暂时忽略
    setMessage('Verification code is correct. Redirecting to reset password page...');
    setTimeout(() => onSwitchToResetPassword(verificationCode), 2000); // 传递验证码
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" gutterBottom>
        Verify Code
      </Typography>
      <Typography variant="body1" gutterBottom>
        We sent a verification code to {email}. Please enter it below.
      </Typography>
      <TextField
        label="Verification Code"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Enter the verification code"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Verify Code
      </Button>
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
    </form>
  );
};

export default VerifyCodeForm;