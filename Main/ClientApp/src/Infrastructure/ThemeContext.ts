import React from "react";
import Cookies from "js-cookie";

export enum Themes {
  Dark,
  Light,
}

const ThemeContext = React.createContext({
  theme: getTheme(),
  toggleTheme: () => {},
});

export function getTheme() {
  let themeCookie = Cookies.getJSON("theme") as Themes | null;
  return themeCookie === null ? Themes.Light : themeCookie;
}

export const ThemeContextProvider = ThemeContext.Provider;

export const ThemeContextConsumer = ThemeContext.Consumer;
