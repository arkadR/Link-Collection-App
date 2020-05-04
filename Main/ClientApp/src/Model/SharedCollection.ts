import { Collection } from "./Collection";
import { User } from "./User";

export type SharedCollection = {
  collectionId: number;
  collection: Collection;
  userId: number;
  editRights: boolean;
  user: User;
};

export type SharedCollectionData = {
  collectionId: number;
  userId: string;
  editRights: boolean;
};
