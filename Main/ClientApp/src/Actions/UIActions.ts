import ActionTypes from "./ActionTypes";
import Dispatcher from "../Infrastructure/Dispatcher";

export async function DisplayMessageInSnackbar(message: string) {
  Dispatcher.dispatch({
    actionType: ActionTypes.DISPLAY_MESSAGE,
    payload: {
      message: message,
    },
  });
}
