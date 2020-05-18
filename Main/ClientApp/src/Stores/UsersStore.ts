import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadUsers, loadCurrentUser } from "../Actions/UserActions";
import { User } from "../Model/User";

class UsersStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_USERS: {
        this._users = action.payload.users;
        this.emitChange();
        break;
      }
      case ActionTypes.LOAD_CURRENT_USER: {
        this._currentUser = action.payload.user;
        this.emitChange();
        break;
      }
    }
  }

  public getUsers(): User[] {
    if (this._users === null) loadUsers();
    return this._users ?? [];
  }

  public getCurrentUser(): User | null {
    if (this._currentUser === null) loadCurrentUser();
    return this._currentUser ?? null;
  }

  private _users: User[] | null = null;
  private _currentUser: User | null = null;
}

const store = new UsersStore();
export default store;
