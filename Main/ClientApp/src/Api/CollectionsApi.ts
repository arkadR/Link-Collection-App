import { Collection, CollectionCreationData } from "../Model/Collection";
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
  ): Promise<boolean> {
    let response = await authorizedPost("api/collections", collectionData);
    return response.ok;
  }

  async deleteCollection(id: number): Promise<boolean> {
    let response = await authorizedDelete("api/collections/" + id);
    return response.ok;
  }

  async updateCollection(id: number, name: string): Promise<boolean> {
    let response = await authorizedPatch("api/collections", { id, name });
    return response.ok;
  }
}

let api = new CollectionsApi();
export default api;
