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
