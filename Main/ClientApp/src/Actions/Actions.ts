import Dispatcher from "../Infrastructure/Dispatcher";
import SharedCollectionsApi from "../Api/SharedCollectionsApi";
import UsersApi from "../Api/UsersApi";
import CollectionsApi from "../Api/CollectionsApi";
import ElementsApi from "../Api/ElementsApi";
import ActionTypes from "./ActionTypes";
import {
  CollectionCreationData,
  CollectionUpdateData,
} from "../Model/Collection";
import { ElementCreationData, ElementUpdateData } from "../Model/Element";
import { SharedCollectionData } from "../Model/SharedCollection";

export async function loadCollections() {
  let collections = await CollectionsApi.getCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_COLLECTIONS,
    payload: { collections: collections },
  });
}

export async function addCollection(
  collectionCreationData: CollectionCreationData
) {
  let success = await CollectionsApi.addCollection(collectionCreationData);
  if (success) loadCollections();
  else console.error("Could not add collection");
}

export async function deleteCollection(id: number) {
  let success = await CollectionsApi.deleteCollection(id);
  if (success) loadCollections();
  else console.error("Could not delete collection");
}

export async function updateCollection(
  id: number,
  updateData: CollectionUpdateData
) {
  let success = await CollectionsApi.updateCollection(id, updateData);
  if (success) {
    loadCollections();
    loadSharedCollections();
  } else console.error("Could not update collection");
}

export async function addElement(elementCreationData: ElementCreationData) {
  let success = await ElementsApi.addElement(elementCreationData);
  if (success) {
    loadCollections();
    loadSharedCollections();
  } else console.error("Could not add element");
}

export async function loadSharedCollections() {
  let sharedCollections = await SharedCollectionsApi.getSharedCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_SHARED_COLLECTIONS,
    payload: { sharedCollections: sharedCollections },
  });
}

export async function shareCollection(shareData: SharedCollectionData) {
  await SharedCollectionsApi.shareCollection(shareData);
}

export async function loadUsers() {
  let users = await UsersApi.getUsers();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_USERS,
    payload: { users: users },
  });
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
