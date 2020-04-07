import { SharedCollection } from "../Model/SharedCollection";
import { authorizedGet } from "../Infrastructure/FetchUtilities";

class SharedCollectionsApi {
  async getSharedCollections(): Promise<SharedCollection[]> {
    var response = await authorizedGet("api/sharedcollections");
    let sharedCollections = (await response.json()) as SharedCollection[];
    return sharedCollections;
  }
}

let api = new SharedCollectionsApi();
export default api;
