import { metropolisFont } from '@/generated/metropolisFont';
import { createTheme } from '@mui/material/styles';
import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

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
  },
  typography: {
    fontFamily: metropolisFont.style.fontFamily,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour
      }
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
