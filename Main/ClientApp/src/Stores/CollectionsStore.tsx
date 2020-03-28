import { Collection } from "../Model/Collection";
import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import Dispatcher from "../Infrastructure/Dispatcher";
import { EventEmitter } from "events";

class CollectionStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.onActionReceived.bind(this));
  }

  addChangeListener(callback: (a: any) => void) {
    this.on("change", callback);
  }

  removeChangeListener(callback: (a: any) => void) {
    this.removeListener("change", callback);
  }

  emitChange() {
    this.emit("change");
  }

  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_COLLECTIONS: {
        this._collections = action.payload.collections;
        this.emitChange();
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
