import FaviconsApi from "../Api/FaviconsApi";

type GetFaviconsOkResponse = {
  domain: string;
  icons: [
    {
      src: string;
      type?: string;
      sizes?: string;
    }
  ];
};

export async function getFaviconUrl(domain: string) {
  let response = await FaviconsApi.getFaviconUrl(domain);
  if (response.ok) {
    let faviconsResponse = (await response.json()) as GetFaviconsOkResponse;
    if (faviconsResponse.icons[0] !== undefined) {
      return faviconsResponse.icons[0].src;
    }
  }
}
