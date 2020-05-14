import { User } from "../Model/User";
import {
  authorizedGet,
  authorizedDelete,
} from "../Infrastructure/FetchUtilities";

class UsersApi {
  async getUsers(): Promise<User[]> {
    let response = await authorizedGet("api/users");
    return (await response.json()) as User[];
  }

  async deleteUser(userId: string): Promise<boolean> {
    let response = await authorizedDelete(`api/users/${userId}`);
    return response.ok;
  }
}

let api = new UsersApi();
export default api;
