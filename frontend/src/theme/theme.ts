// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Define color palette based on design specifications
const colors = {
  brand: '#0057F6',
  neutral: {
    1: '#111827',
    2: '#1F2937',
    3: '#374151',
    4: '#4B5563',
    5: '#6B7280',
    6: '#9CA3AF',
    7: '#D1D5DB',
    8: '#E5E7EB',
    9: '#F3F4F6',
    10: '#F9FAFB',
  },
  text: {
    1: '#111827',
    2: '#6B7280',
    3: '#9CA3AF',
    4: '#D1D5DB',
    5: '#FFFFFF',
    6: '#141414',
  },
  line: {
    1: '#9CA3AF',
    2: '#D1D5DB',
    3: '#E5E7EB',
    4: '#F3F4F6',
    5: '#F9FAFB',
  },
  primary: {
    1: '#1E283E',
    2: '#274268',
    3: '#285795',
    4: '#2B60CA',
    5: '#4487E4',
    6: '#68A2F3',
    7: '#A5CBF8',
    8: '#D2E4FF',
    9: '#E5F0FF',
    10: '#F2F6FD',
  },
  success: {
    1: '#1E283E',
    2: '#274268',
    3: '#285795',
    4: '#16A34A',
    5: '#22C55E',
    6: '#A4D8E0',
    7: '#86EFAC',
    8: '#BBF7D0',
    9: '#DCFFE7',
    10: '#FDFDF4',
  },
  warning: {
    1: '#78350F',
    2: '#92400E',
    3: '#B45309',
    4: '#D97706',
    5: '#F59E0B',
    6: '#FBBF24',
    7: '#FCD34D',
    8: '#FDE68A',
    9: '#FEF3C7',
    10: '#FFFBEB',
  },
  destructive: {
    1: '#7F1D1D',
    2: '#991B1B',
    3: '#B91C1C',
    4: '#DC2626',
    5: '#F53F3F',
    6: '#F76560',
    7: '#F98981',
    8: '#FECACA',
    9: '#FEE2E2',
    10: '#FEF2F2',
  },
  black: '#000000', // Pure Black color definition
};

// Create theme using the color palette
const theme = createTheme({
  palette: {
    primary: {
      main: colors.brand,
    },
    text: {
      primary: colors.text[1],
      secondary: colors.text[2],
      disabled: colors.text[4],
    },
    background: {
      default: colors.neutral[10],
      paper: colors.neutral[9],
    },
    success: {
      main: colors.success[5],
    },
    warning: {
      main: colors.warning[5],
    },
    error: {
      main: colors.destructive[4],
    },
    divider: colors.line[3],
    common: {
      black: colors.black, // Adding black to the palette under common
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '22px',
      textAlign: 'left',
    },
    // Other typography styles can be defined here
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
