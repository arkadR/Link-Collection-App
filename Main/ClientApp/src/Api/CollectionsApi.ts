import {
  Collection,
  CollectionCreationData,
  CollectionUpdateData,
} from "../Model/Collection";
import {
  authorizedPost,
  authorizedGet,
  authorizedDelete,
  authorizedPatch,
} from "../Infrastructure/FetchUtilities";

class CollectionsApi {
  async getCollections(): Promise<Collection[]> {
    var response = await authorizedGet("api/collections");
    let collections = (await response.json()) as Collection[];
    return collections;
  }

  async addCollection(
    collectionData: CollectionCreationData
  ): Promise<Response> {
    let response = await authorizedPost("api/collections", collectionData);
    return response;
  }

  async deleteCollection(id: number): Promise<boolean> {
    let response = await authorizedDelete(`api/collections/${id}`);
    return response.ok;
  }

  async updateCollection(
    id: number,
    updateData: CollectionUpdateData
  ): Promise<boolean> {
    let response = await authorizedPatch(`api/collections/${id}`, updateData);
    return response.ok;
  }

  async makePublic(id: number): Promise<boolean> {
    let response = await authorizedPatch(`api/collections/${id}/makePublic`);
    return response.ok;
  }
}

let api = new CollectionsApi();
export default api;
