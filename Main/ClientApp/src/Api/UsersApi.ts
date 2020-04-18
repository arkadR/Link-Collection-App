import { User } from "../Model/User";
import { authorizedGet } from "../Infrastructure/FetchUtilities";

class UsersApi {
  async getUsers(): Promise<User[]> {
    let response = await authorizedGet("api/users");
    return (await response.json()) as User[];
  }
}

let api = new UsersApi();
export default api;
