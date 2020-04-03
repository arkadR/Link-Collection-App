import { authorizedPost } from "../Infrastructure/FetchUtilities";
import { ElementCreationData } from "../Model/Element";

class ElementsApi {
  async addElement(elementData: ElementCreationData): Promise<boolean> {
    let response = await authorizedPost("api/elements", elementData);
    return response.ok;
  }
}

let api = new ElementsApi();
export default api;
