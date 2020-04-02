import React from "react";
import { parse } from "tldts";

export function GetHostnameLink(url: string) {
  return "https://" + parse(url).hostname;
}
