import { Collection } from "../Model/Collection";

class CollectionsApi {
  async getCollections(): Promise<Collection[]> {
    let response = await fetch("collections");
    let collections = (await response.json()) as Collection[];
    return collections;
  }
}
let api = new CollectionsApi();
export default api;
