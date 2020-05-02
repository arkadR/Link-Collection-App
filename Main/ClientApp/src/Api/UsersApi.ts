import { User } from "../Model/User";
import { authorizedGet } from "../Infrastructure/FetchUtilities";

class UsersApi {
  async getUsers(): Promise<User[]> {
    let response = await authorizedGet("api/users");
    return (await response.json()) as User[];
  }

  async getContributors(): Promise<Map<number, User[]>> {
    let response = await authorizedGet(`api/users/contributors`);
    return (await response.json()) as Map<number, User[]>;
  }
}

let api = new UsersApi();
export default api;
