import React, { ReactNode, useState } from "react";
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@material-ui/core/styles";
import {
  ThemeContextProvider,
  Themes,
  getTheme,
} from "../Infrastructure/ThemeContext";

type DarkThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider(props: DarkThemeProviderProps) {
  const [themeType, setThemeType] = useState<Themes>(getTheme());

  const toggleTheme = () => {
    setThemeType(themeType === Themes.Dark ? Themes.Light : Themes.Dark);
  };

  const palletType = themeType === Themes.Dark ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  return (
    <ThemeContextProvider value={{ theme: themeType, toggleTheme }}>
      <MaterialThemeProvider theme={theme}>
        {props.children}
      </MaterialThemeProvider>
    </ThemeContextProvider>
  );
}
