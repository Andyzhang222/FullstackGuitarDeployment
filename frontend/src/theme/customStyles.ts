// customStyles.ts
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import theme from './theme'; // 假设你的主题文件路径

export const BodyText = styled(Typography)({
  ...theme.typography.body1,
  color: '#141414',
});

export const LogoName = styled(Typography)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '28px',
  color: 'rgba(0, 0, 0, 0.85)', // 使用 85% 不透明度的黑色
});

// Styled component for body text
export const BodyRegular = styled(Typography)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  textAlign: 'left',
  color: '#141414',
});
