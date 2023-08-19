import { metropolisFont } from '@/generated/metropolisFont';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: metropolisFont.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#ffffff',
          }),
        }),
      },
    },
  },
});

export default theme;
