import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d84315", // pizza-red
    },
    secondary: {
      main: "#ffb300", // cheese-gold
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
