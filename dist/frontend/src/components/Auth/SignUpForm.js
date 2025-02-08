"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const VisibilityOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/VisibilityOutlined"));
const VisibilityOffOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/VisibilityOffOutlined"));
const Ellipse_svg_1 = tslib_1.__importDefault(require("../../assets/images/Ellipse.svg"));
const ClearOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/ClearOutlined"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const SignUpForm = ({ onSwitch, onRegistrationSuccess, }) => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(false);
    const [showUsername, setShowUsername] = (0, react_1.useState)(true); // 默认可见
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleClickShowUsername = () => {
        setShowUsername(!showUsername);
    };
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            console.log(email + '111111111111111');
            setErrorMessage('Invalid email format. Please enter a correct email address.');
            setEmail(''); // 清空邮箱输入框
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match. Please make sure both passwords are the same.');
            setPassword(''); // 清空密码输入框
            setConfirmPassword(''); // 清空确认密码输入框
            return;
        }
        try {
            const response = await fetch(`${config_1.default}:5001/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                setErrorMessage('');
                setOpen(true);
            }
            else {
                const errorData = await response.json();
                setErrorMessage(` ${errorData.message || 'Unknown error'}`);
                // 根据错误信息清空相应的输入框
                if (errorData.message.includes('Password must be at least 8 characters, with one number, 1 special character, 1 uppercase, and 1 lowercase letter.')) {
                    setPassword(''); // 清空密码输入框
                    setConfirmPassword('');
                }
            }
        }
        catch (error) {
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
    return (<form onSubmit={handleSubmit} className="signin-form" style={{
            width: '432px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // 向左对齐
            maxHeight: '100vh',
            fontFamily: 'Helvetica',
        }}>
      {' '}
      <material_1.Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <img src={Ellipse_svg_1.default} alt="Ellipse" style={{
            width: '32px',
            height: '32px',
            marginBottom: '10px',
            fontSize: '14px',
        }}/>
      </material_1.Box>
      <material_1.Typography variant="h5" component="h1" gutterBottom style={{
            marginBottom: '5px',
            textAlign: 'left',
            width: '432px',
            fontSize: '28px',
            fontWeight: '700',
        }}>
        Welcome to Fantasy
      </material_1.Typography>
      <material_1.Typography variant="subtitle1" gutterBottom style={{
            marginBottom: '30px',
            textAlign: 'left',
            width: '432px',
            fontFamily: 'PingFang SC',
            fontWeight: '400',
            fontSize: '16px',
            color: '#4E5969',
        }}>
        Register your account
      </material_1.Typography>
      <material_1.Typography variant="body2" align="left" style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
        }}>
        Email
      </material_1.Typography>
      <material_1.TextField type={showUsername ? 'text' : 'password'} variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} InputLabelProps={{
            shrink: true,
        }} placeholder="Enter your email address..." style={{
            marginBottom: '16px',
            width: '432px',
            height: '32px',
        }} inputProps={{
            style: {
                height: '32px',
                padding: '0 14px',
            },
        }} InputProps={{
            endAdornment: (<material_1.InputAdornment position="end">
              {email && (<material_1.IconButton aria-label="clear email" onClick={() => setEmail('')} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                        fontSize: '20px',
                        transform: 'scale(0.7)', // 缩小图标的大小
                    }}>
                  <ClearOutlined_1.default style={{ fontSize: '20px' }}/>
                </material_1.IconButton>)}
              <material_1.IconButton aria-label="toggle email visibility" onClick={handleClickShowUsername} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                    fontSize: '20px',
                    transform: 'scale(0.7)', // 缩小图标的大小
                }}>
                {showUsername ? (<VisibilityOutlined_1.default style={{ fontSize: '20px' }}/>) : (<VisibilityOffOutlined_1.default style={{ fontSize: '20px' }}/>)}
              </material_1.IconButton>
            </material_1.InputAdornment>),
        }}/>
      <material_1.Typography variant="body2" align="left" style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
        }}>
        Password
      </material_1.Typography>
      <material_1.TextField type={showPassword ? 'text' : 'password'} variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} InputLabelProps={{
            shrink: true,
        }} placeholder="Enter your password..." style={{
            marginBottom: '16px',
            width: '432px',
            height: '32px',
        }} inputProps={{
            style: {
                height: '32px',
                padding: '0 14px',
            },
        }} InputProps={{
            endAdornment: (<material_1.InputAdornment position="end">
              {password && (<material_1.IconButton aria-label="clear password" onClick={() => setPassword('')} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                        fontSize: '20px',
                        transform: 'scale(0.7)', // 缩小图标的大小
                    }}>
                  <ClearOutlined_1.default style={{ fontSize: '20px' }}/>
                </material_1.IconButton>)}
              <material_1.IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                    fontSize: '20px',
                    transform: 'scale(0.7)', // 缩小图标的大小
                }}>
                {showPassword ? (<VisibilityOutlined_1.default style={{ fontSize: '20px' }}/>) : (<VisibilityOffOutlined_1.default style={{ fontSize: '20px' }}/>)}
              </material_1.IconButton>
            </material_1.InputAdornment>),
        }}/>
      <material_1.Typography variant="body2" align="left" style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
        }}>
        Confirm Password
      </material_1.Typography>
      <material_1.TextField type={showConfirmPassword ? 'text' : 'password'} variant="outlined" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} InputLabelProps={{
            shrink: true,
        }} placeholder="Confirm your password..." style={{
            marginBottom: '16px',
            width: '432px',
            height: '32px',
        }} inputProps={{
            style: {
                height: '32px',
                padding: '0 14px',
            },
        }} InputProps={{
            endAdornment: (<material_1.InputAdornment position="end">
              {confirmPassword && (<material_1.IconButton aria-label="clear confirmPassword" onClick={() => setConfirmPassword('')} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                        fontSize: '20px',
                        transform: 'scale(0.7)', // 缩小图标的大小
                    }}>
                  <ClearOutlined_1.default style={{ fontSize: '20px' }}/>
                </material_1.IconButton>)}
              <material_1.IconButton aria-label="toggle confirm password visibility" onClick={handleClickShowConfirmPassword} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                    fontSize: '20px',
                    transform: 'scale(0.7)', // 缩小图标的大小
                }}>
                {showConfirmPassword ? (<VisibilityOutlined_1.default style={{ fontSize: '20px' }}/>) : (<VisibilityOffOutlined_1.default style={{ fontSize: '20px' }}/>)}
              </material_1.IconButton>
            </material_1.InputAdornment>),
        }}/>
      <material_1.Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" // 这里添加 alignItems 属性
     width="100%" maxWidth={432} mb={2} sx={{
            marginTop: '-15px',
        }}>
        <material_1.FormControlLabel control={<material_1.Checkbox name="remember" sx={{
                transform: 'scale(0.7)', // 缩小复选框的大小
                borderColor: 'rgba(0, 0, 0, 0.23)',
            }}/>} label="Remember me" sx={{
            '& .MuiFormControlLabel-label': {
                fontSize: '14px',
                color: '#4E5969',
                marginLeft: '-10px',
            },
        }}/>
      </material_1.Box>
      <material_1.Box style={{ height: '48px', marginBottom: '2px', marginTop: '-28px' }}>
        {errorMessage && (<material_1.Typography color="error" variant="body2">
            {errorMessage}
          </material_1.Typography>)}
      </material_1.Box>
      <material_1.Button type="submit" variant="contained" fullWidth style={{
            marginBottom: '22px',
            width: '432px',
            height: '40px',
            fontWeight: '700',
            backgroundColor: 'black', // 设置按钮背景颜色为蓝色
            color: 'white', // 设置按钮字体颜色为白色
            textTransform: 'none', // 确保没有强制转换文本
            marginTop: '-10px',
            borderRadius: '4px',
        }}>
        Sign up
      </material_1.Button>
      <material_1.Button variant="outlined" fullWidth style={{
            width: '432px',
            height: '40px',
            fontWeight: '700',
            fontFamily: 'PingFang SC',
            textTransform: 'none', // 确保没有强制转换文本
            color: '#4E5969', // 设置按钮背景颜色为蓝色
            borderColor: 'rgba(0, 0, 0, 0.23)', // 设置边框颜色为默认的灰黑色
            borderRadius: '4px',
        }}>
        Continue as a guest
      </material_1.Button>
      <material_1.Box display="flex" justifyContent="center" mt={2}>
        <material_1.Typography variant="body2" align="left" style={{
            marginTop: '16px',
            width: '432px',
            color: '#86909C',
        }}>
          {'Already have an account? '}
          <material_1.Link href="#" onClick={onSwitch} style={{
            marginLeft: '3px',
            color: 'black', // 设置按钮背景颜色为蓝色
            fontWeight: '400',
            textDecoration: 'none', // 去掉下划线
        }}>
            Sign in
          </material_1.Link>
        </material_1.Typography>
      </material_1.Box>
      <material_1.Dialog open={open} onClose={handleClose}>
        <material_1.DialogTitle>Registration Successful</material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.DialogContentText>
            Your account has been created successfully. Please sign in to
            continue.
          </material_1.DialogContentText>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={handleClose} color="primary">
            OK
          </material_1.Button>
        </material_1.DialogActions>
      </material_1.Dialog>
    </form>);
};
exports.default = SignUpForm;
//# sourceMappingURL=SignUpForm.js.map