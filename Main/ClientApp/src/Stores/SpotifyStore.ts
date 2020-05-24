import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { getSpotifyClientId } from "../Actions/SpotifyActions";

class SpotifyStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.GET_SPOTIFY_TRACK_INFO: {
        this._tracks.set(action.payload.trackId, action.payload.trackInfo);
        this.emitChange();
        break;
      }
      case ActionTypes.GET_SPOTIFY_CLIENT_ID: {
        this._clientId = action.payload.clientId;
        this.emitChange();
        break;
      }
    }
  }

  public getTrack(trackId: string): SpotifyApi.SingleTrackResponse | undefined {
    return this._tracks.get(trackId);
  }

  public getSpotifyClientId(): string | null {
    if (this._clientId === null) getSpotifyClientId();
    return this._clientId;
  }

  private _tracks: Map<string, SpotifyApi.SingleTrackResponse> = new Map();
  private _clientId: string | null = null;
}

const store = new SpotifyStore();
export default store;
