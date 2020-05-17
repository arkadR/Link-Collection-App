import Dispatcher from "../Infrastructure/Dispatcher";
import ConfigurationApi from "../Api/ConfigurationApi";
import ActionTypes from "./ActionTypes";
import { Configuration } from "../Model/Configuration";

export async function loadConfiguration() {
  let configuration = await ConfigurationApi.getConfiguration();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CONFIGURATION,
    payload: { configuration: configuration },
  });
}

export async function updateConfiguration(config: Configuration) {
  let success = await ConfigurationApi.updateConfiguration(config);
  if (success) loadConfiguration();
  else console.error("Could not update configuration");
}
