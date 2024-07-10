import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

interface ForgotPasswordFormProps {
  onSwitchToSignIn: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
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
          body: JSON.stringify({ username: email }), // 将 email 作为 username 发送
        }
      );

      if (response.ok) {
        setMessage(
          'Verification code sent to your email. Please check your inbox.'
        );
        setCodeSent(true);
        setTimer(60); // 设置 60 秒倒计时
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    // 这里你可以添加验证验证码的逻辑
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
        Forgot Password
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
        disabled={codeSent} // 验证码发送后禁用 email 输入框
      />
      {codeSent && (
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
      )}
      {codeSent ? (
        <Button
          onClick={handleVerifyCode}
          variant="contained"
          color="primary"
          fullWidth
        >
          Verify Code
        </Button>
      ) : (
        <Button
          onClick={handleSendCode}
          variant="contained"
          color="primary"
          fullWidth
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend Code in ${timer}s` : 'Send Verification Code'}
        </Button>
      )}
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
          onSwitchToSignIn(); // 调用传递过来的 handleForgotPassword 函数
        }}
      >
        Back to Sign In
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
