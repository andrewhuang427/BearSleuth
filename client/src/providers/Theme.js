//import { createTheme, createBreakpoints } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "rgba(245, 245, 245, 1)",
    },
    background: {
      paper: "rgba(255, 255, 255, 1)",
      aqua: "rgba(41, 148, 121, 0.9)",
      grass: "rgba(58, 180, 75, 0.15)",
      lightGrass: "rgb(240, 253, 232)",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(128, 230, 140, 1)",
      main: "rgba(58, 180, 75, 1)",
      dark: "rgba(65, 117, 5, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(41, 148, 121, 1)",
      main: "rgba(27, 127, 125, 1)",
      dark: "rgba(6, 122, 94, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      gray: "gray",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

theme.typography.subtitle1 = {
    color: theme.palette.common.black,
    fontWeight: 500,
    fontSize: 18,
  };

theme.typography.subtitle2 = {
  color: theme.palette.text.secondary,
  fontWeight: 400,
  fontSize: 14,
};



export default theme;
