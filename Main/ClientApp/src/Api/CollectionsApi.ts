import { Collection, CollectionCreationData } from "../Model/Collection";
import {
  authorizedPost,
  authorizedGet,
  authorizedDelete,
} from "../Infrastructure/FetchUtilities";

class CollectionsApi {
  async getCollections(): Promise<Collection[]> {
    var response = await authorizedGet("api/collections");
    let collections = (await response.json()) as Collection[];
    return collections;
  }

  async addCollection(
    collectionData: CollectionCreationData
  ): Promise<boolean> {
    let response = await authorizedPost("api/collections", collectionData);
    return response.ok;
  }

  async deleteCollection(id: number): Promise<boolean> {
    let response = await authorizedDelete("api/collections", id);
    return response.ok;
  }
}

let api = new CollectionsApi();
export default api;
