"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const VisibilityOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/VisibilityOutlined"));
const VisibilityOffOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/VisibilityOffOutlined"));
const Ellipse_svg_1 = tslib_1.__importDefault(require("../../assets/images/Ellipse.svg"));
const ClearOutlined_1 = tslib_1.__importDefault(require("@mui/icons-material/ClearOutlined"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const SignInForm = ({ onSwitch, onSwitchToForgotPassword, }) => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(''); // 添加错误状态
    const [showPassword, setShowPassword] = (0, react_1.useState)(false); // 管理密码可见状态
    const [showUsername, setShowUsername] = (0, react_1.useState)(true); // 管理用户名可见状态
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // 提交前清除错误信息
        try {
            const response = await fetch(`${config_1.default}:5001/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.AccessToken && data.IdToken && data.RefreshToken) {
                    localStorage.setItem('accessToken', data.AccessToken);
                    localStorage.setItem('idToken', data.IdToken);
                    localStorage.setItem('refreshToken', data.RefreshToken);
                    navigate('/');
                }
                else {
                    setError('Failed to receive tokens. Please try again.');
                    setPassword(''); // 清空密码字段
                }
            }
            else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'An error occurred while signing in';
                setError(errorMessage);
                setPassword(''); // 清空密码字段
            }
        }
        catch (error) {
            setError('An unknown error occurred. Please try again.');
            setPassword(''); // 清空密码字段
        }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowUsername = () => {
        setShowUsername(!showUsername);
    };
    return (<form onSubmit={handleSubmit} className="signin-form" style={{
            width: '432px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // 向左对齐
            maxHeight: '100vh',
            fontFamily: 'Helvetica',
        }}>
      <material_1.Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
        <img src={Ellipse_svg_1.default} alt="Ellipse" style={{
            width: '32px',
            height: '32px',
            marginBottom: '10px',
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
        Welcome Back! Please enter your details.
      </material_1.Typography>
      <material_1.Box display="flex" flexDirection="column" alignItems="center" width="100%" fontWeight="700" fontSize="14px">
        <material_1.Typography variant="body2" align="left" style={{
            marginBottom: '8px',
            width: '432px',
            fontWeight: '700',
            color: '#4E5969',
        }}>
          Email
        </material_1.Typography>
        <material_1.TextField type={showUsername ? 'text' : 'password'} variant="outlined" fullWidth required value={username} onChange={(e) => setUsername(e.target.value)} InputLabelProps={{
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
                {username && (<material_1.IconButton aria-label="clear email" onClick={() => setUsername('')} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
                        fontSize: '20px',
                        transform: 'scale(0.7)', // 缩小图标的大小
                    }}>
                    <ClearOutlined_1.default style={{ fontSize: '20px' }}/>
                  </material_1.IconButton>)}
                <material_1.IconButton aria-label="toggle username visibility" onClick={handleClickShowUsername} edge="end" size="small" style={{ fontSize: '20px' }} sx={{
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
          <material_1.Link href="#" className="forgot-password" sx={{
            fontSize: '14px',
            color: '#4E5969',
            fontWeight: '400',
        }} onClick={(e) => {
            e.preventDefault();
            onSwitchToForgotPassword(); // 调用传递过来的 handleForgotPassword 函数
        }}>
            Forgot password?
          </material_1.Link>
        </material_1.Box>
        <material_1.Box style={{ height: '24px', marginBottom: '2px', marginTop: '-10px' }}>
          {error && (<material_1.Typography color="error" variant="body2">
              {error}
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
            borderRadius: '4px',
        }}>
          Sign in
        </material_1.Button>
        <material_1.Button variant="outlined" fullWidth style={{
            marginBottom: '16px',
            width: '432px',
            height: '40px',
            fontWeight: '700',
            fontFamily: 'PingFang SC',
            textTransform: 'none', // 确保没有强制转换文本
            color: '#4E5969', // 设置按钮背景颜色为蓝色
            borderColor: 'rgba(0, 0, 0, 0.23)', // 设置边框颜色为默认的灰黑色
            borderRadius: '4px',
        }} onClick={() => navigate('/')} // 添加这个onClick事件处理程序
    >
          Continue as a guest
        </material_1.Button>
        <material_1.Typography variant="body2" align="left" style={{
            marginTop: '16px',
            width: '432px',
            color: '#86909C',
        }}>
          {"Don't have an account? "}
          <material_1.Link href="#" onClick={onSwitch} style={{
            marginLeft: '3px',
            color: 'black', // 设置按钮背景颜色为蓝色
            fontWeight: '400',
            textDecoration: 'none', // 去掉下划线
        }}>
            Sign up
          </material_1.Link>
        </material_1.Typography>
      </material_1.Box>
    </form>);
};
exports.default = SignInForm;
//# sourceMappingURL=SignInForm.js.map