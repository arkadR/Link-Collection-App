import {
  SharedCollection,
  SharedCollectionData,
} from "../Model/SharedCollection";
import {
  authorizedGet,
  authorizedPost,
  authorizedPatch,
} from "../Infrastructure/FetchUtilities";

class SharedCollectionsApi {
  async getSharedCollections(): Promise<SharedCollection[]> {
    var response = await authorizedGet("api/sharedcollections");
    let sharedCollections = (await response.json()) as SharedCollection[];
    return sharedCollections;
  }

  async getContributorsSharedCollections(): Promise<SharedCollection[]> {
    var response = await authorizedGet("api/sharedcollections/contributors");
    let contributorsSharedCollections = (await response.json()) as SharedCollection[];
    return contributorsSharedCollections;
  }

  async shareCollection(shareData: SharedCollectionData): Promise<Response> {
    var response = await authorizedPost("api/sharedcollections", shareData);
    return response;
  }

  async updateSharedCollection(
    updateData: SharedCollectionData
  ): Promise<boolean> {
    let response = await authorizedPatch(`api/sharedcollections`, updateData);
    return response.ok;
  }
}

let api = new SharedCollectionsApi();
export default api;
