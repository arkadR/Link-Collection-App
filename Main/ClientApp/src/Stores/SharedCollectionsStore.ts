import { SharedCollection } from "../Model/SharedCollection";
import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadSharedCollections } from "../Actions/Actions";

class SharedCollectionStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_SHARED_COLLECTIONS: {
        this._sharedCollections = action.payload.sharedCollections;
        this.emitChange();
        break;
      }
    }
  }

  public getSharedCollections(): SharedCollection[] {
    if (this._sharedCollections == null) loadSharedCollections();
    return this._sharedCollections ?? [];
  }

  public getSharedCollection(collectionId: number): SharedCollection | null {
    let sharedCollection = this._sharedCollections?.find(
      (sc) => sc.collection.id == collectionId
    );
    return sharedCollection ?? null;
  }

  private _sharedCollections: SharedCollection[] | null = null;
}

const store = new SharedCollectionStore();
export default store;
