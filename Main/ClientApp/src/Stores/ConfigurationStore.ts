import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import {
  loadConfiguration,
  updateConfiguration,
} from "../Actions/ConfigurationActions";
import { Configuration } from "../Model/Configuration";

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

  public getConfiguration(): Configuration | null {
    if (this._configuration == null) loadConfiguration();
    return this._configuration;
  }

  public setMaxCollectionsPerUser(newValue: number) {
    this._configuration!.maxCollectionsPerUser = newValue;
    updateConfiguration(this._configuration!);
  }

  public setMaxElementsInCollection(newValue: number) {
    this._configuration!.maxElementsInCollection = newValue;
    updateConfiguration(this._configuration!);
  }

  private _configuration: Configuration | null = null;
}

const store = new ConfigurationStore();
export default store;
