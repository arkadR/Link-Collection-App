import Dispatcher from "../Infrastructure/Dispatcher";
import CollectionsApi from "../Api/CollectionsApi";
import ActionTypes from "./ActionTypes";

export async function loadCollections() {
  let collections = await CollectionsApi.getCollections();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_COLLECTIONS,
    payload: { collections: collections }
  });
}
