export type User = {
  id: string;
  name: string;
  email: string;
  isLockedOut: boolean | null;
  roles: string[];
};

export enum UserRights {
  ViewRights,
  EditRights,
}
