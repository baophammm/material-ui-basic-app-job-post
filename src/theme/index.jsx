import { CssBaseline } from '@mui/material';
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { orange, red } from '@mui/material/colors';

const PRIMARY = {
  lighter: '#f9e9e9',
  light: '#423e3e',
  main: '#000',
  dark: '#383030',
  darker: '#000',
  contrastText: '#FFF',
};
const SECONDARY = {
  lighter: red[300],
  light: red[400],
  main: red[500],
  dark: red[600],
  darker: red[700],
  contrastText: '#fff',
};
const SUCCESS = {
  lighter: orange[300],
  light: orange[400],
  main: orange[500],
  dark: orange[600],
  darker: orange[700],
  contrastText: '#000',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: {
        primary: GREY[800],
        secondary: SECONDARY['contrastText'],
        disabled: GREY[500],
      },
      background: {
        paper: PRIMARY.contrastText,
        default: PRIMARY.main,
        neutral: GREY[200],
      },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
    overrides: {
      MuiPaginationItem: {
        textPrimary: {
          color: 'white', // Change the text color to red
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
