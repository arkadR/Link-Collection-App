import { Collection } from "../Model/Collection";
import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadCollections } from "../Actions/CollectionActions";

class CollectionStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_COLLECTIONS: {
        this._collections = action.payload.collections;
        this.emitChange();
        break;
      }
      case ActionTypes.ADD_COLLECTION: {
        loadCollections();
        break;
      }
    }
  }

  public getCollections(): Collection[] {
    if (this._collections == null) loadCollections();
    return this._collections ?? [];
  }

  public getCollection(id: number): Collection | null {
    // eslint-disable-next-line eqeqeq
    let collection = this._collections?.find((c) => c.id == id);
    return collection ?? null;
  }

  private _collections: Collection[] | null = null;
}

const store = new CollectionStore();
export default store;
