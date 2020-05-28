import Dispatcher from "../Infrastructure/Dispatcher";
import ActionTypes from "./ActionTypes";

export async function cookieChanged(key?: string) {
  Dispatcher.dispatch({
    actionType: ActionTypes.COOKIE_CHANGED,
    payload: { key: key },
  });
}
