import SpotifyApi from "../Api/SpotifyApi";
import { DisplayMessageInSnackbar } from "./UIActions";

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
