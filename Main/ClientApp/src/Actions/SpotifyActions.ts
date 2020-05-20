import Dispatcher from "../Infrastructure/Dispatcher";
import SpotifyApi from "../Api/SpotifyApi";
import ActionTypes from "./ActionTypes";

export async function setSpotifyUserToken(token: string) {
  Dispatcher.dispatch({
    actionType: ActionTypes.SPOTIFY_USER_TOKEN,
    payload: { spotifyUserToken: token },
  });
}

// export async function addToQueue(uri:string){}
