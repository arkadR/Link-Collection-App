import { EventEmitter } from "events";
import Dispatcher from "./Dispatcher";
import Action from "./Action";

export default abstract class StoreBase extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.onActionReceived.bind(this));
  }

  addChangeListener(callback: (a: any) => void) {
    super.on("change", callback);
  }

  removeChangeListener(callback: (a: any) => void) {
    super.removeListener("change", callback);
  }

  emitChange() {
    super.emit("change");
  }

  abstract onActionReceived(action: Action): void;
}
