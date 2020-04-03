import Dispatcher from "../Infrastructure/Dispatcher";
import CollectionsApi from "../Api/CollectionsApi";
import ElementsApi from "../Api/ElementsApi";
import ActionTypes from "./ActionTypes";
import { CollectionCreationData } from "../Model/Collection";
import { ElementCreationData } from "../Model/Element";

export async function loadCollections() {
  let collections = await CollectionsApi.getCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_COLLECTIONS,
    payload: { collections: collections }
  });
}

export async function addCollection(
  collectionCreationData: CollectionCreationData
) {
  let success = await CollectionsApi.addCollection(collectionCreationData);
  if (success) loadCollections();
  else console.log("Could not add collection");
}

export async function addElement(elementCreationData: ElementCreationData) {
  let success = await ElementsApi.addElement(elementCreationData);
  if (success) loadCollections();
  else console.log("Could not add element");
}
