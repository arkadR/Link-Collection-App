import Dispatcher from "../Infrastructure/Dispatcher";
import ConfigurationApi from "../Api/ConfigurationApi";
import ActionTypes from "./ActionTypes";

export async function loadConfiguration() {
  let configuration = await ConfigurationApi.getConfiguration();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CONFIGURATION,
    payload: { configuration: configuration },
  });
}

export async function changeValue(key: string, value: string) {
  let success = await ConfigurationApi.changeValue(key, value);
  if (success) loadConfiguration();
  else console.error("Could not change congiguration value for " + key);
}
