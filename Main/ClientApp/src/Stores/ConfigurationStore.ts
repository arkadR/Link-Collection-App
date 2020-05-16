import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadConfiguration } from "../Actions/ConfigurationActions";

class ConfigurationStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_CONFIGURATION: {
        this._configuration = action.payload.configuration;
        this.emitChange();
        break;
      }
    }
  }

  public getConfiguration(): Map<string, string> {
    if (this._configuration == null) loadConfiguration();
    return this._configuration ?? new Map();
  }

  private _configuration: Map<string, string> | null = null;
}

const store = new ConfigurationStore();
export default store;
