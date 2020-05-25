import Dispatcher from "../Infrastructure/Dispatcher";
import UsersApi from "../Api/UsersApi";
import ActionTypes from "./ActionTypes";
import SnackbarSeverity from "./SnackbarSeverity";
import { DisplayMessageInSnackbar } from "./UIActions";

export async function loadUsers() {
  let users = await UsersApi.getUsers();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_USERS,
    payload: { users: users },
  });
}

export async function loadCurrentUser() {
  let user = await UsersApi.getCurrentUser();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CURRENT_USER,
    payload: { user: user },
  });
}

export async function lockoutUser(userId: string) {
  let success = await UsersApi.deleteUser(userId);
  if (success) {
    DisplayMessageInSnackbar(
      "User has been locked out",
      SnackbarSeverity.SUCCESS
    );
    loadUsers();
  } else {
    DisplayMessageInSnackbar(
      "Could not lock out the user",
      SnackbarSeverity.ERROR
    );
  }
}
