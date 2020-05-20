import SpotifyApi from "../Api/SpotifyApi";
import { DisplayMessageInSnackbar } from "./UIActions";
import Dispatcher from "../Infrastructure/Dispatcher";
import ActionTypes from "./ActionTypes";

export async function addToQueue(trackUri: string, userToken: string) {
  let response = await SpotifyApi.addToQueue(trackUri, userToken);
  if (response.ok) {
    DisplayMessageInSnackbar("Track successfully added to queue");
  } else {
    let message = await response.text();
    //IDEA: nivalidate userToken
    DisplayMessageInSnackbar("Could not add track to queue. " + message);
  }
}

export async function getTrackInfo(trackId: string, userToken: string) {
  let trackInfo = await SpotifyApi.getTrackInfo(trackId, userToken);
  Dispatcher.dispatch({
    actionType: ActionTypes.GET_SPOTIFY_TRACK_INFO,
    payload: { trackInfo: trackInfo, trackId: trackId },
  });
}
