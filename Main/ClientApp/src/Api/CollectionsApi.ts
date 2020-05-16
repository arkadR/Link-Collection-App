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
import { DisplayMessageInSnackbar } from "../Actions/UIActions";

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
    if (response.ok) return true;

    let message = await response.text();
    DisplayMessageInSnackbar(message);
    return false;
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
