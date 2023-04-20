import {
  createTheme,
  TypographyVariantsOptions,
  PaletteOptions,
  Components,
} from '@mui/material';
import { CustomVariables } from './types';

const interVariable = {
  fontFamily: 'Inter',
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '100 200 300 400 500 600 700 800 900',
  src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
};

export const colors = {
  stationGray: {
    50: '#F7FBFF',
    100: '#EFF2F6',
    200: '#E2E5EC',
    300: '#CED5DF',
    400: '#A3A9B5',
    500: '#707785',
    600: '#465263',
    700: '#323E51',
    800: '#1C2838',
    900: '#111827',
  },
  stationRed: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  stationOrange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  stationYellow: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  stationGreen: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  stationTeal: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  stationCyan: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },
  stationLightBlue: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },
  stationBlue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  stationIndigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  stationPurple: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  stationPink: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  },
  stationRose: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },
};

// We will define custom colors with the name
// station<ColorName> to keep MUI colors in case we need them
export const palette: PaletteOptions = {
  ...colors,
};

const components: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      '@font-face': [interVariable],
    },
  },
  MuiButton: {
    styleOverrides: {
      text: {
        textTransform: 'none',
      },
      root: {
        padding: '11px 0 11px',
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '& .Mui-disabled': {
          backgroundColor: colors.stationGray[300],
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: '10px 12px',
      },
      root: {
        borderRadius: 8,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.stationGray[200],
          boxShadow: '0px 1px 2px 0px rgba(10, 14, 22, 0.05)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.stationGray[400],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.stationBlue[400],
          boxShadow: '0px 0px 0px 4px rgba(191, 219, 254, 1)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        boxShadow:
          '0px 4px 6px -1px rgba(10, 14, 22, 0.1), 0px 2px 4px -1px rgba(10, 14, 22, 0.06)',
      },
    },
  },
};

// TO BE DEFINE LATER
const typography: TypographyVariantsOptions = {};

const custom: CustomVariables = {
  iconUnderlayMargin: 10,
};

export const theme = createTheme({ typography, palette, components, custom });
