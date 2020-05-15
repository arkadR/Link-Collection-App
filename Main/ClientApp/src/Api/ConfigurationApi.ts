import {
  authorizedGet,
  authorizedPatch,
} from "../Infrastructure/FetchUtilities";

class ConfigurationApi {
  async getConfiguration(): Promise<Map<string, string>> {
    let response = await authorizedGet("api/configuration");
    let configurationArr = (await response.json()) as string[][];
    let map = new Map();
    configurationArr.forEach((a) => map.set(a[0], a[1]));
    return map;
  }

  async changeValue(key: string, value: string): Promise<boolean> {
    let response = await authorizedPatch(`api/configuration/${key}/${value}`);
    return response.ok;
  }
}

let api = new ConfigurationApi();
export default api;
