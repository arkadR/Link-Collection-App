import React, { ReactNode, useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import CookiesChangedStore from "../Stores/CookiesUpdateStore";

type DarkThemeProviderProps = {
  children: ReactNode;
};

export default function DarkThemeProvider(props: DarkThemeProviderProps) {
  const getDarkMode = () => {
    let darkmodeCookie = Cookies.getJSON("darkmode") as boolean | null;
    return darkmodeCookie === null ? false : darkmodeCookie;
  };
  const [darkMode, setDarkMode] = useState(getDarkMode());

  const palletType = darkMode ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  useEffect(() => {
    const themeChangedHandler = () => {
      setDarkMode(getDarkMode());
    };
    CookiesChangedStore.addChangeListener(themeChangedHandler);

    return () => {
      CookiesChangedStore.removeChangeListener(themeChangedHandler);
    };
  }, []);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
