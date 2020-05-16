import {
  authorizedPost,
  authorizedDelete,
  authorizedPatch,
} from "../Infrastructure/FetchUtilities";
import { ElementCreationData, ElementUpdateData } from "../Model/Element";

class ElementsApi {
  async addElement(elementData: ElementCreationData): Promise<Response> {
    let response = await authorizedPost("api/elements", elementData);
    return response;
  }

  async updateElement(
    collectionId: number,
    elementId: number,
    updateData: ElementUpdateData
  ): Promise<boolean> {
    let response = await authorizedPatch(
      `api/elements/${collectionId}/${elementId}`,
      updateData
    );
    return response.ok;
  }

  async deleteElement(
    collectionId: number,
    elementId: number
  ): Promise<boolean> {
    let response = await authorizedDelete(
      `api/elements/${collectionId}/${elementId}`
    );
    return response.ok;
  }
}

let api = new ElementsApi();
export default api;
