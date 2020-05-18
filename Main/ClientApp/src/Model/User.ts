export type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export enum UserRights {
  ViewRights,
  EditRights,
}
