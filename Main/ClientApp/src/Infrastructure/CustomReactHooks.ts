import Cookies from "js-cookie";
import { useState } from "react";
import { cookieChanged } from "../Actions/CookieUpdateActions";

export function useCookie<T>(
  cookieName: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  let value = Cookies.getJSON(cookieName) as T;
  if (value === undefined) {
    Cookies.set(cookieName, JSON.stringify(defaultValue));
    value = defaultValue;
  }
  const [cookieVal, setCookieVal] = useState(value);
  const onChange = (newValue: T): void => {
    Cookies.set(cookieName, JSON.stringify(newValue));
    setCookieVal(newValue);
    cookieChanged(cookieName);
  };
  return [cookieVal, onChange];
}
