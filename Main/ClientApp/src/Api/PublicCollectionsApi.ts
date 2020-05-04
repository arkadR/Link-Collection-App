import { Collection } from "../Model/Collection";

class PublicCollectionsApi {
  async getPublicCollection(id: number): Promise<Collection | null> {
    const host = window.location.origin;
    let response = await fetch(`${host}/api/public/${id}`);
    if (!response.ok) return null;
    let collection = (await response.json()) as Collection;
    return collection;
  }
}

let api = new PublicCollectionsApi();
export default api;
