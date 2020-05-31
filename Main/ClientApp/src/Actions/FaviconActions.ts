import FaviconsApi from "../Api/FaviconsApi";
import Dispatcher from "../Infrastructure/Dispatcher";
import ActionTypes from "./ActionTypes";

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
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_FAVICON,
        payload: {
          domain: faviconsResponse.domain,
          iconUrl: faviconsResponse.icons[0].src,
        },
      });
    }
  }
}
