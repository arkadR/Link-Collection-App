import ActionTypes from "./ActionTypes";
import Dispatcher from "../Infrastructure/Dispatcher";
import SnackbarSeverity from "./SnackbarSeverity";

export async function DisplayMessageInSnackbar(
  message: string,
  severity: string = SnackbarSeverity.INFO
) {
  Dispatcher.dispatch({
    actionType: ActionTypes.DISPLAY_MESSAGE,
    payload: {
      message: message,
      severity: severity,
    },
  });
}
