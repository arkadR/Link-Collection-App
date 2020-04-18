import { parse } from "tldts";

export function GetHostnameLink(url: string) {
  return "https://" + parse(url).hostname;
}

export function GetProperUrl(rawUrl: string) {
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    return rawUrl;
  return `https://${rawUrl}`;
}
