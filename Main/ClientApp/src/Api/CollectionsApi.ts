import { Collection } from "../Model/Collection";
import authService from "../Authorization/AuthorizeService";

class CollectionsApi {
  async getCollections() {
    const token = await authService.getAccessToken();
    const response = await fetch("api/collections", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    });
    let collections = (await response.json()) as Collection[];
    return collections;
  }
}

let api = new CollectionsApi();
export default api;
