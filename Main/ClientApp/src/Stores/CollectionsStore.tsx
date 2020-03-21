import { EventEmitter } from "events";
import { Collection } from "../Model/Collection";

class CollectionStore extends EventEmitter {
  addChangeListener(callback: (a: any) => void) {
    this.on("change", callback);
  }

  removeChangeListener(callback: (a: any) => void) {
    this.removeListener("change", callback);
  }

  emitChange() {
    this.emit("change");
  }
}
