import Dispatcher from "../Infrastructure/Dispatcher";
import CollectionsApi from "../Api/CollectionsApi";
import ActionTypes from "./ActionTypes";
import { CollectionCreationData } from "../Model/Collection";

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
  CollectionsApi.addCollection(collectionCreationData);
  Dispatcher.dispatch({
    actionType: ActionTypes.ADD_COLLECTION,
    payload: { collectionCreationData: collectionCreationData }
  });
}
