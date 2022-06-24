import { createTheme, Theme, ThemeOptions } from '@material-ui/core/styles';

const theme = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        root: {
          display: 'flex',
        },
        body: {
          scrollBehavior: 'smooth',
          margin: 0,
          backgroundColor: '#4B89DC',
          color: 'white',
        },
        '.boldText': {
          fontWeight: '700 !important',
        },
        '.routerLink': {
          textDecoration: 'none',
          color: 'black !important',
        },
      },
    },
  },
} as ThemeOptions;

export const createAppTheme = (): Theme => createTheme(theme);
