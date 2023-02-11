import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#05dd80",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9c27b0",
        },
    },
};

const theme = createTheme(themeOptions);

export default function ThemeContext({ children }: any) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
