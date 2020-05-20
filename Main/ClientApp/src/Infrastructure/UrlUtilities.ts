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

export function OpenLink(href: string) {
  Object.assign(document.createElement("a"), {
    href,
  }).click();
}

// Get the hash of the url
export function UrlHash(url: string) {
  return url
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial.set(parts[0], decodeURIComponent(parts[1]));
      }
      return initial;
    }, new Map());
}
