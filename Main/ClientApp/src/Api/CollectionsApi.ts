import { Collection } from "../Model/Collection";
import authService from "../Authorization/AuthorizeService";

class CollectionsApi {
  async getCollections() {
    const host = window.location.origin;
    const token = await authService.getAccessToken();
    const response = await fetch(`${host}/api/collections`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    });
    console.log({ response: response });
    let collections = (await response.json()) as Collection[];
    return collections;
  }
}

let api = new CollectionsApi();
export default api;
