import { Collection } from "../Model/Collection";
import { authorizedGet } from "../Infrastructure/FetchUtilities";
import { PublicCollectionVisitor } from "../Model/PublicCollectionVisitor";

class PublicCollectionsApi {
  async getPublicCollection(id: number): Promise<Collection | null> {
    const host = window.location.origin;
    let response = await fetch(`${host}/api/public/${id}`);
    if (!response.ok) return null;
    let collection = (await response.json()) as Collection;
    return collection;
  }

  async getPublicCollectionVisitorData(
    id: number
  ): Promise<PublicCollectionVisitor[] | null> {
    let response = await authorizedGet(`api/public/${id}/stats`);
    if (!response.ok) return null;
    return (await response.json()) as PublicCollectionVisitor[];
  }
}

let api = new PublicCollectionsApi();
export default api;
