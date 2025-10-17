export const tokens = {
  colors: {
    primary: {
      50: '#F2F7FF',
      100: '#E1ECFF',
      200: '#B3D1FF',
      300: '#80B2FF',
      400: '#4D92FF',
      500: '#1A73E8',
      600: '#0F5EC1',
      700: '#0C4994'
    },
    secondary: {
      50: '#FFF5F2',
      100: '#FFE6DE',
      200: '#FFC5B3',
      300: '#FFA280',
      400: '#FF8052',
      500: '#FF5C26',
      600: '#E04D1B',
      700: '#B73C14'
    },
    success: '#1DB954',
    warning: '#F5A623',
    error: '#D93025',
    neutral: {
      0: '#FFFFFF',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.5rem'
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.3,
      normal: 1.5
    }
  }
} as const;

export type DesignTokens = typeof tokens;
