// import { green, grey, lightBlue, orange, red, yellow } from "@mui/material/colors";
import { createTheme, responsiveFontSizes, styled } from "@mui/material/styles";

// Create a theme instance.
// could probably simplify eliminate a lot of the colors
// this theme "borrowed" from MUI website.
const contrastTextColor = "rgba(0, 0, 0, 0.87)";
let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      50: "#F0F7FF",
      100: "#C2E0FF",
      200: "#99CCF3",
      300: "#66B2FF",
      400: "#3399FF",
      500: "#007FFF",
      600: "#0072E5",
      700: "#0059B2",
      800: "#004C99",
      900: "#003A75",
      contrastText: contrastTextColor,
      dark: "#0059B2",
      light: "#66B2FF",
      main: "#3399FF",
    },
    secondary: { main: "#ce93d8", light: "#f3e5f5", dark: "#ab47bc", contrastText: contrastTextColor },
    error: {
      50: "#FFF0F1",
      100: "#FFDBDE",
      200: "#FFBDC2",
      300: "#FF99A2",
      400: "#FF7A86",
      500: "#FF505F",
      600: "#EB0014",
      700: "#C70011",
      800: "#94000D",
      900: "#570007",
      contrastText: "#fff",
      dark: "#C70011",
      light: "#FF99A2",
      main: "#EB0014",
    },
    success: {
      50: "#E9FBF0",
      100: "#C6F6D9",
      200: "#9AEFBC",
      300: "#6AE79C",
      400: "#3EE07F",
      500: "#21CC66",
      600: "#1DB45A",
      700: "#1AA251",
      800: "#178D46",
      900: "#0F5C2E",
      contrastText: contrastTextColor,
      dark: "#1AA251",
      light: "#6AE79C",
      main: "#1DB45A",
    },
    warning: {
      50: "#FFF9EB",
      100: "#FFF3C1",
      200: "#FFECA1",
      300: "#FFDC48",
      400: "#F4C000",
      500: "#DEA500",
      600: "#D18E00",
      700: "#AB6800",
      800: "#8C5800",
      900: "#5A3600",
      contrastText: "#eb0c0c",
      dark: "#AB6800",
      light: "#FFDC48",
      main: "#DEA500",
      // ketchup: "#eb0c0c",
      // mustard: "#feff00",
    },
    info: { main: "#29b6f6", light: "#4fc3f7", dark: "#0288d1", contrastText: contrastTextColor },
    text: {
      primary: "#000000",
      secondary: "#B2BAC2",
      disabled: "rgba(255, 255, 255, 0.5)",
      // icon: "rgba(255, 255, 255, 0.5)",
    },
    action: {
      activatedOpacity: 0.24,
      active: "#fff",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
    },
    background: {
      default: "#008080",
      paper: "#BFBFBF",
    },
    common: {
      black: "#1D1D1D",
      white: "#fff",
    },
    contrastThreshold: 3,
    divider: "rgba(194, 224, 255, 0.08)",
    tonalOffset: 0.2,
  },
  shape: { borderRadius: 1 },
  spacing: 8,
  zIndex: {
    appBar: 1201,
    drawer: 1200,
    fab: 1050,
    mobileStepper: 1000,
    modal: 1300,
    snackbar: 1400,
    speedDial: 1050,
    tooltip: 1500,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 32,
          borderColor: "rgba(247, 247, 247, 0.7);",
          background: "#BFBFBF",
          boxShadow:
            "inset -1px -1px 0px #000000, inset 1px 1px 0px #DBDBDB, inset -2px -2px 0px #808080, inset 2px 2px 0px #FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#000000",
          borderColor: "rgba(247, 247, 247, 0.7);",
          background: "#BFBFBF",
          boxShadow:
            "inset -1px -1px 0px #000000, inset 1px 1px 0px #DBDBDB, inset -2px -2px 0px #808080, inset 2px 2px 0px #FFFFFF",
        },
        outlined: {
          color: "#000000",
          borderColor: "#000000",
          background: "#BFBFBF",
          boxShadow:
            "inset -1px -1px 0px #000000, inset 1px 1px 0px #DBDBDB, inset -2px -2px 0px #808080, inset 2px 2px 0px #FFFFFF",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        colorAction: {
          color: contrastTextColor,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

/**
 * FormRowThemeComponent
 */
export const FormRowThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

export const FormInputThemeComponent = styled("span")(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

export const WalletWarningTC = styled("div")(({ theme }) => ({
  color: theme.palette.warning.contrastText,
  padding: theme.spacing(1),
}));

export const ConnectorRowTC = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default theme;
