export type User = {
  id: string;
  name: string;
  email: string;
};

export enum UserRights {
  ViewRights,
  EditRights,
}
