import Dispatcher from "../Infrastructure/Dispatcher";
import SharedCollectionsApi from "../Api/SharedCollectionsApi";
import CollectionsApi from "../Api/CollectionsApi";
import ActionTypes from "./ActionTypes";
import {
  CollectionCreationData,
  CollectionUpdateData,
} from "../Model/Collection";
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

export async function loadSharedCollections() {
  let sharedCollections = await SharedCollectionsApi.getSharedCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_SHARED_COLLECTIONS,
    payload: { sharedCollections: sharedCollections },
  });
}

export async function loadSharedCollectionsRelatedToCollections() {
  let contributorsSharedCollections = await SharedCollectionsApi.getContributorsSharedCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_SHARED_COLLECTIONS_RELATED_TO_COLLECTIONS,
    payload: { contributorsSharedCollections: contributorsSharedCollections },
  });
}

export async function shareCollection(shareData: SharedCollectionData) {
  let success = await SharedCollectionsApi.shareCollection(shareData);
  if (success) {
    loadSharedCollections();
    loadSharedCollectionsRelatedToCollections();
  }
}

export async function changeContributorRights(
  updateData: SharedCollectionData
) {
  let success = await SharedCollectionsApi.updateSharedCollection(updateData);
  if (success) {
    loadSharedCollections();
    loadSharedCollectionsRelatedToCollections();
  } else console.error("Could not change contributor rights");
}

export async function deleteContributorOfCollection(
  collectionId: number,
  userId: number
) {
  let success = await SharedCollectionsApi.deleteSharedCollection(
    collectionId,
    userId
  );
  if (success) {
    loadSharedCollectionsRelatedToCollections();
  } else console.error("Could not delete shared collection");
}
