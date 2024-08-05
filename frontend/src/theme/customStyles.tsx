// customStyles.ts
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import theme from './theme'; // 假设你的主题文件路径

export const BodyText = styled(Typography)({
  ...theme.typography.body1,
  color: '#FFFFFF',
});

export const LogoName = styled(Typography)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '28px',
  color: '#FFFFFF', // 使用 85% 不透明度的黑色
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

// 添加 SectionHeader 样式
export const SectionHeader = styled(Typography)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontSize: '30px',
  fontWeight: 500,
  lineHeight: '40px',
  textAlign: 'left',
});

export const PriceTag = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '28px',
  textAlign: 'left',
});

export const TitleText = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#141414',
});
