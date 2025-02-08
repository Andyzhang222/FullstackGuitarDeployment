"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const signinupPicture_jpg_1 = tslib_1.__importDefault(require("../assets/images/signinupPicture.jpg"));
const SignUpForm_1 = tslib_1.__importDefault(require("../components/Auth/SignUpForm"));
const SignInForm_1 = tslib_1.__importDefault(require("../components/Auth/SignInForm"));
const ForgotPasswordForm_1 = tslib_1.__importDefault(require("../components/Auth/ForgotPasswordForm")); // 添加这个导入
const SignInAndSignUpPage = () => {
    const [currentForm, setCurrentForm] = (0, react_1.useState)('signIn');
    const switchToSignUp = () => setCurrentForm('signUp');
    const switchToSignIn = () => setCurrentForm('signIn');
    const switchToForgotPassword = () => setCurrentForm('forgotPassword');
    const handleRegistrationSuccess = () => {
        setCurrentForm('signIn');
    };
    return (<material_1.Box display="flex" height="100vh">
      <material_1.Box sx={{
            width: '42%', // 固定宽度为42%
            display: 'flex',
            justifyContent: 'flex-start', // 确保图片靠左对齐
            alignItems: 'center',
            overflow: 'hidden', // 防止图片溢出
        }}>
        <img src={signinupPicture_jpg_1.default} alt="Sign Up" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }}/>
      </material_1.Box>
      <material_1.Box sx={{
            flexGrow: 1, // 占满剩余空间
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white', // 确保背景色一致
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // 添加阴影效果
            padding: '32px',
            borderRadius: '8px',
        }}>
        <material_1.Container maxWidth="xs">
          <material_1.Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 12,
        }}>
            {currentForm === 'signIn' && (<SignInForm_1.default onSwitch={switchToSignUp} onSwitchToForgotPassword={switchToForgotPassword}/>)}
            {currentForm === 'signUp' && (<SignUpForm_1.default onSwitch={switchToSignIn} onRegistrationSuccess={handleRegistrationSuccess}/>)}
            {currentForm === 'forgotPassword' && (<ForgotPasswordForm_1.default onSwitchToSignIn={switchToSignIn}/>)}
          </material_1.Box>
        </material_1.Container>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = SignInAndSignUpPage;
//# sourceMappingURL=SignInAndSignUpPage.js.map