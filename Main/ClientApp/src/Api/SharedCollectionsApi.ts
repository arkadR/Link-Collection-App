import { SharedCollection } from "../Model/SharedCollection";
import { authorizedGet } from "../Infrastructure/FetchUtilities";

class SharedCollectionsApi {
  async getSharedCollections(): Promise<SharedCollection[]> {
    var response = await authorizedGet("api/shared");
    let collections = (await response.json()) as SharedCollection[];
    return collections;
  }
}

let api = new SharedCollectionsApi();
export default api;
