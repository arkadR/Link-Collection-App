import ActionTypes from "../Actions/ActionTypes";
import StoreBase from "../Infrastructure/StoreBase";
import Action from "../Infrastructure/Action";
import { loadUsers, loadContributors } from "../Actions/UserActions";
import { User } from "../Model/User";

class UsersStore extends StoreBase {
  onActionReceived(action: Action): void {
    switch (action.actionType) {
      case ActionTypes.LOAD_USERS: {
        this._users = action.payload.users;
        this.emitChange();
        break;
      }
      case ActionTypes.LOAD_CONTRIBUTORS: {
        this._contributorsMap = action.payload.contributors;
        this.emitChange();
      }
    }
  }

  public getUsers(): User[] {
    if (this._users == null) loadUsers();
    return this._users ?? [];
  }

  public getContributors(): Map<number, User[]> {
    if (this._contributorsMap == null) loadContributors();
    return this._contributorsMap ?? new Map();
  }

  private _users: User[] | null = null;
  private _contributorsMap: Map<number, User[]> | null = null;
}

const store = new UsersStore();
export default store;
