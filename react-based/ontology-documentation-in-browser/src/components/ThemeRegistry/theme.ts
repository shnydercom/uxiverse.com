import { createTheme } from '@mui/material/styles';

import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
const metropolisFont = localFont({
  src: [

  ],
  display: "swap",
})

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
