import { Collection } from "../Model/Collection";
import { unauthorizedGet } from "../Infrastructure/FetchUtilities";

class PublicCollectionsApi {
  async getPublicCollection(id: number): Promise<Collection | null> {
    var response = await unauthorizedGet(`api/publiccollections/${id}`);
    if (!response.ok) return null;
    let collection = (await response.json()) as Collection;
    return collection;
  }
}

let api = new PublicCollectionsApi();
export default api;
