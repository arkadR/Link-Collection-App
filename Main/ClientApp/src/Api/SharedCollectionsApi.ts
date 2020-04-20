import {
  SharedCollection,
  SharedCollectionData,
} from "../Model/SharedCollection";
import {
  authorizedGet,
  authorizedPost,
} from "../Infrastructure/FetchUtilities";

class SharedCollectionsApi {
  async getSharedCollections(): Promise<SharedCollection[]> {
    var response = await authorizedGet("api/sharedcollections");
    let sharedCollections = (await response.json()) as SharedCollection[];
    return sharedCollections;
  }

  async shareCollection(shareData: SharedCollectionData): Promise<Response> {
    var response = await authorizedPost("api/sharedcollections", shareData);
    return response;
  }
}

let api = new SharedCollectionsApi();
export default api;
