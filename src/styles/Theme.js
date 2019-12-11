//https://material-ui.com/customization/default-theme/?expend-path=$.palette

import { createMuiTheme} from '@material-ui/core/styles';

export const outerTheme = createMuiTheme({
palette: {
    primary: {
        main: '#689f38',
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