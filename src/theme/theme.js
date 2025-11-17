import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0066CC',
      light: '#3399FF',
      dark: '#0052A3',
    },
    secondary: {
      main: '#667eea',
      light: '#8b9ff5',
      dark: '#4a5fb3',
    },
    accent: {
      main: '#00D4FF',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f7fa',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '12px 24px',
          transition: 'all 0.3s ease-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        contained: {
          boxShadow: '0 10px 30px rgba(0, 102, 204, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(0, 102, 204, 0.2)',
          },
        },
      },
    },
  },
});