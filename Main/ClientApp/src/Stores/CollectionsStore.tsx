import { Collection } from "../Model/Collection";
import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";

class CollectionStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_COLLECTIONS: {
        this._collections = action.payload.collections;
        super.emitChange();
        break;
      }
    }
  }

  public getCollections() {
    return this._collections;
  }

  private _collections: Collection[] = [];
}

const store = new CollectionStore();
export default store;
