import { EventEmitter } from "events";
import Dispatcher from "./Dispatcher";
import Action from "./Action";

export default abstract class StoreBase extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.onActionReceived);
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

  abstract onActionReceived(action: Action): void;
}
