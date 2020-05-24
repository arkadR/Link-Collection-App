import { parse } from "tldts";

export function GetUserFriendlyHostname(url: string) {
  return parse(url).hostname;
}

export function GetHostnameLink(url: string) {
  return "https://" + parse(url).hostname;
}

export function GetProperUrl(rawUrl: string) {
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    return rawUrl;
  return `https://${rawUrl}`;
}

export function OpenInNewTab(href: string) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href,
    rel: "noopener noreferrer",
  }).click();
}

export function GetQueryParams(urlParams: string) {
  let paramsMap = new Map();
  urlParams
    .substring(1)
    .split("&")
    .forEach((param) => {
      let parts = param.split("=");
      paramsMap.set(parts[0], decodeURIComponent(parts[1]));
    });
  return paramsMap;
}
