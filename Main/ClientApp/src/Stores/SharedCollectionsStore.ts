import { SharedCollection } from "../Model/SharedCollection";
import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import {
  loadSharedCollections,
  loadSharedCollectionsRelatedToCollections,
} from "../Actions/CollectionActions";

class SharedCollectionStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_SHARED_COLLECTIONS: {
        this._sharedCollections = action.payload.sharedCollections;
        this.emitChange();
        break;
      }
      case ActionTypes.LOAD_SHARED_COLLECTIONS_RELATED_TO_COLLECTIONS: {
        this._contributorsSharedCollections =
          action.payload.contributorsSharedCollections;
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
      // eslint-disable-next-line eqeqeq
      (sc) => sc.collection.id == collectionId
    );
    return sharedCollection ?? null;
  }

  public getSharedCollectionRelatedToCollection(
    collectionId: number,
    userId: string
  ): SharedCollection | null {
    if (this._contributorsSharedCollections == null)
      loadSharedCollectionsRelatedToCollections();
    let sharedCollection = this._contributorsSharedCollections?.find(
      (sc) => sc.collectionId === collectionId && sc.userId === userId
    );
    return sharedCollection ?? null;
  }

  public getSharedCollectionsRelatedToCollections(): SharedCollection[] | null {
    if (this._contributorsSharedCollections == null)
      loadSharedCollectionsRelatedToCollections();
    return this._contributorsSharedCollections ?? [];
  }

  private _sharedCollections: SharedCollection[] | null = null;
  private _contributorsSharedCollections: SharedCollection[] | null = null;
}

const store = new SharedCollectionStore();
export default store;
