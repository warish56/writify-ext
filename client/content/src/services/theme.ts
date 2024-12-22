import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {

    interface TypeBackground {
        dark: string
    }

    interface TypeText{
        dark:string;
    }

    interface ZIndex{
        popper:number;
    }

    interface Palette {
      gray: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      };
    }


    interface PaletteOptions {
        gray: {
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
          }
    }

    interface ZIndexOptions{
        popper: number;
    }
  
  }

// Custom color palette based on #7E60BF
const palette = {
  primary: {
    main: '#7E60BF', // base purple
    light: '#9D85CF', // lighter shade
    dark: '#5F449B', // darker shade
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#B4A1DB', // softer purple
    light: '#D1C5EA', // very light purple
    dark: '#8E74C4', // medium purple
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FBFAFF', // slight purple tint
    dark: grey[900]
  },
  text: {
    primary: '#2D2440', // dark purple-gray
    secondary: '#6B6684', // medium purple-gray
    dark: grey[50]
  },
  action: {
    hover: '#F4F1FA', // very light purple
    selected: '#EAE4F5', // light purple
    disabled: '#ABA7B7', // muted purple-gray
  },
  divider: '#E8E5EF', // light purple-gray
  gray: {
    100: '#F7F7F7',
    200: '#E6E6E6', 
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040'
  }
};

export const AppTheme = createTheme({
  palette,
  zIndex: {
    popper: 100000,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
    body2: {
        fontSize: '0.9rem',
        lineHeight: 1.7,
    },
    caption: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiTooltip:{
        styleOverrides:{
            tooltip:({theme}) => ({
                '&':{
                    backgroundColor: theme.palette.background.dark,
                    color: theme.palette.text.dark,
                    ...theme.typography.body2,
                    padding: '8px',
                }   
            })
        }
    }
  }
});