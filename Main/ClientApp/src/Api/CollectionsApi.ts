import { Collection, CollectionCreationData } from "../Model/Collection";
import authService from "../Authorization/AuthorizeService";

class CollectionsApi {
  async getCollections() {
    const host = window.location.origin;
    const token = await authService.getAccessToken();
    const response = await fetch(`${host}/api/collections`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    });
    console.log({ response: response });
    let collections = (await response.json()) as Collection[];
    return collections;
  }

  async addCollection(collection: CollectionCreationData) {
    const host = window.location.origin;
    postData(`${host}/api/collections`, { collection: collection }).then(
      data => {
        console.log(data); // JSON data parsed by `response.json()` call
      }
    );
  }
}

async function postData(url: string, data = {}) {
  const token = await authService.getAccessToken();
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return await response.json();
}

let api = new CollectionsApi();
export default api;
