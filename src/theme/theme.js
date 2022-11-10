import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2A3143'
        },
        secondary: {
            main: '#3C80F5'
        },
        error: {
            main: red.A400
        },
        light: {
            main: '#ffffff'
        }
    }
});