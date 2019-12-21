//https://material-ui.com/customization/default-theme/?expend-path=$.palette

import { createMuiTheme} from '@material-ui/core/styles';

export const outerTheme = createMuiTheme({
palette: {
    primary: {
        main:  '#828E42',
    },
    secondary: {
        main: '#c62828',
    },
},   
});

export const custTheme = createMuiTheme({
palette: {
    primary: {
        main: '#ff8f00',
    },
    secondary: {
        main: '#689f38',
    },
},  
typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // '@font-face': [raleway],
      },
    },
  }, 
});

export const formTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#828E42',
        },
        secondary: {
            main: '#7C4A33',
        },
    },   
    });


export const globalTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff8f00',
        },
        secondary: {
            main: '#689f38',
        },
    },   
    });