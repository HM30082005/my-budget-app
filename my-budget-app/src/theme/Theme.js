// src/theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // light blue color
        },
        secondary: {
            main: '#f48fb1', // pink color
        },
        error: {
            main: '#f44336', // red color
        },
        warning: {
            main: '#ff9800', // orange color
        },
        info: {
            main: '#2196f3', // blue color
        },
        success: {
            main: '#4caf50', // green color
        },
    },
});

export default darkTheme;
