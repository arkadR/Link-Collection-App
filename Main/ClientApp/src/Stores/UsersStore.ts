import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadUsers } from "../Actions/UserActions";
import { User } from "../Model/User";

class UsersStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_USERS: {
        this._users = action.payload.users;
        this.emitChange();
        break;
      }
    }
  }

  public getUsers(): User[] {
    if (this._users == null) loadUsers();
    return this._users ?? [];
  }

  private _users: User[] | null = null;
}

const store = new UsersStore();
export default store;
