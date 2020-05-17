import {
  authorizedGet,
  authorizedPatch,
} from "../Infrastructure/FetchUtilities";
import { Configuration } from "../Model/Configuration";

class ConfigurationApi {
  async getConfiguration(): Promise<Configuration> {
    let response = await authorizedGet("api/configuration");
    let configuration = (await response.json()) as Configuration;
    return configuration;
  }

  async updateConfiguration(newConfig: Configuration): Promise<boolean> {
    let response = await authorizedPatch(`api/configuration`, newConfig);
    return response.ok;
  }
}

let api = new ConfigurationApi();
export default api;
