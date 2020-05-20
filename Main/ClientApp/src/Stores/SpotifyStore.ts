import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";

class SpotifyStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.GET_SPOTIFY_TRACK_INFO: {
        this._tracks.set(action.payload.trackId, action.payload.trackInfo);
        this.emitChange();
        break;
      }
    }
  }

  public getTrack(trackId: string): SpotifyApi.SingleTrackResponse | undefined {
    return this._tracks.get(trackId);
  }

  private _tracks: Map<string, SpotifyApi.SingleTrackResponse> = new Map();
}

const store = new SpotifyStore();
export default store;
