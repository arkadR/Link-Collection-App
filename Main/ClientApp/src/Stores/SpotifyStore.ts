import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";

class SpotifyStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.SPOTIFY_USER_TOKEN: {
        this._token = action.payload.spotifyUserToken;
        this.emitChange();
        break;
      }
    }
  }

  public getToken(): string | null {
    return this._token;
  }

  private _token: string | null = null;
}

const store = new SpotifyStore();
export default store;
