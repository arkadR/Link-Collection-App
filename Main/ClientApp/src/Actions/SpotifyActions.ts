import SpotifyApi from "../Api/SpotifyApi";
import { DisplayMessageInSnackbar } from "./UIActions";
import Dispatcher from "../Infrastructure/Dispatcher";
import ActionTypes from "./ActionTypes";
import ConfigurationApi from "../Api/ConfigurationApi";
import SnackbarSeverity from "./SnackbarSeverity";

type SpotifyErrorResponse = {
  error: {
    status: string;
    message: string;
    reason: string;
  };
};

export async function addToQueue(trackUri: string, userToken: string) {
  let response = await SpotifyApi.addToQueue(trackUri, userToken);
  if (response.ok) {
    DisplayMessageInSnackbar(
      "Track successfully added to queue",
      SnackbarSeverity.SUCCESS
    );
  } else {
    let error = (await response.json()) as SpotifyErrorResponse;
    //IDEA: invalidate userToken
    DisplayMessageInSnackbar(
      `Could not add track to queue: ${error.error.message}`,
      SnackbarSeverity.ERROR
    );
  }
}

export async function getTrackInfo(trackId: string, userToken: string) {
  let trackInfo = await SpotifyApi.getTrackInfo(trackId, userToken);
  Dispatcher.dispatch({
    actionType: ActionTypes.GET_SPOTIFY_TRACK_INFO,
    payload: { trackId: trackId, trackInfo: trackInfo },
  });
}

export async function getSpotifyClientId() {
  let clientId = await ConfigurationApi.getSpotifyClientId();
  if (clientId === null)
    DisplayMessageInSnackbar(
      "Could not fetch client id",
      SnackbarSeverity.ERROR
    );
  else
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_SPOTIFY_CLIENT_ID,
      payload: { clientId: clientId },
    });
}
