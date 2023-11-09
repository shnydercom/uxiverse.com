import { metropolisFont } from '@/generated/metropolisFont';
import { createTheme } from '@mui/material/styles';
import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

//helpful resources for creating themes: 
//https://mui.com/material-ui/customization/color/
//https://zenoo.github.io/mui-theme-creator
//https://m2.material.io/inline-tools/color/

/**
 * MUI offers styling function for links, nextjs offers prefetching function. 
 * This and the defaultprops in the components combines the two
 */
const LinkBehaviour = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006fc8',
    },
    secondary: {
      main: '#86f2e9',
    },
    error: {
      main: '#d80004',
    },
    warning: {
      main: '#e88426',
    },
    info: {
      main: '#1d9eeb',
    },
    success: {
      main: '#17b63a',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: metropolisFont.style.fontFamily,
    h1: {
      fontSize: 96,
      fontWeight: 300,
    },
    h2: {
      fontSize: 60,
    },
    h3: {
      fontSize: 48,
    },
    h4: {
      fontSize: 34,
    },
    h5: {
      fontSize: 24,
    },
    h6: {
      fontSize: 20,
    },
    subtitle1: {
      fontSize: 16,
    },
    subtitle2: {
      fontSize: 14,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 12,
    },
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          "& .MuiLink-root:hover": {
            "textShadow": "1px 1px 1px #ffffffaa",
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour
      }
    },
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
