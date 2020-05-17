import ElementsApi from "../Api/ElementsApi";
import { ElementCreationData, ElementUpdateData } from "../Model/Element";
import { loadCollections, loadSharedCollections } from "./CollectionActions";
import { DisplayMessageInSnackbar } from "./UIActions";

export async function addElement(elementCreationData: ElementCreationData) {
  let response = await ElementsApi.addElement(elementCreationData);
  if (response.ok) {
    loadCollections();
    loadSharedCollections();
  } else {
    let message = await response.text();
    DisplayMessageInSnackbar(message);
  }
}

export async function updateElement(
  collectionId: number,
  elementId: number,
  updateData: ElementUpdateData
) {
  let result = await ElementsApi.updateElement(
    collectionId,
    elementId,
    updateData
  );
  if (result === true) {
    loadCollections();
    loadSharedCollections();
  } else {
    console.error("Could not update element");
  }
}

export async function deleteElement(collectionId: number, elementId: number) {
  let result = await ElementsApi.deleteElement(collectionId, elementId);
  if (result === true) {
    loadCollections();
    loadSharedCollections();
  } else {
    console.error("Could not delete element");
  }
}
