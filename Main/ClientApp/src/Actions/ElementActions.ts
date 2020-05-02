import ElementsApi from "../Api/ElementsApi";
import { ElementCreationData, ElementUpdateData } from "../Model/Element";
import { loadCollections, loadSharedCollections } from "./CollectionActions";

export async function addElement(elementCreationData: ElementCreationData) {
  let success = await ElementsApi.addElement(elementCreationData);
  if (success) {
    loadCollections();
    loadSharedCollections();
  } else console.error("Could not add element");
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
