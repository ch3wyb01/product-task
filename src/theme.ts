import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#32aa3c',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#CF0010',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Source Sans Pro", sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});

export default customTheme;