import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";

class CookiesUpdateStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.COOKIE_CHANGED: {
        this.emitChange();
        break;
      }
    }
  }
}

const store = new CookiesUpdateStore();
export default store;
