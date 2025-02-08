"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const VerifyCodeForm = ({ email, onSwitchToResetPassword, }) => {
    const [verificationCode, setVerificationCode] = (0, react_1.useState)('');
    const [message, setMessage] = (0, react_1.useState)('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 验证验证码的逻辑，这里可以暂时忽略
        setMessage('Verification code is correct. Redirecting to reset password page...');
        setTimeout(() => onSwitchToResetPassword(verificationCode), 2000); // 传递验证码
    };
    return (<form onSubmit={handleSubmit}>
      <material_1.Typography variant="h5" component="h1" gutterBottom>
        Verify Code
      </material_1.Typography>
      <material_1.Typography variant="body1" gutterBottom>
        We sent a verification code to {email}. Please enter it below.
      </material_1.Typography>
      <material_1.TextField label="Verification Code" variant="outlined" fullWidth margin="normal" required value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} InputLabelProps={{
            shrink: true,
        }} placeholder="Enter the verification code"/>
      <material_1.Button type="submit" variant="contained" color="primary" fullWidth>
        Verify Code
      </material_1.Button>
      {message && (<material_1.Typography variant="body2" color="textSecondary">
          {message}
        </material_1.Typography>)}
    </form>);
};
exports.default = VerifyCodeForm;
//# sourceMappingURL=VerifyCodeForm.js.map