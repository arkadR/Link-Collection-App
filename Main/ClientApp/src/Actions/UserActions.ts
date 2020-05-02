import Dispatcher from "../Infrastructure/Dispatcher";
import UsersApi from "../Api/UsersApi";
import ActionTypes from "./ActionTypes";

export async function loadUsers() {
  let users = await UsersApi.getUsers();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_USERS,
    payload: { users: users },
  });
}

export async function loadContributors() {
  let contributors = await UsersApi.getContributors();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CONTRIBUTORS,
    payload: { contributors: contributors },
  });
}
