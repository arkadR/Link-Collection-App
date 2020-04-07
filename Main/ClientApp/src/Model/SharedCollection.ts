import { Collection } from "./Collection";

export type SharedCollection = {
  collectionId: number;
  collection: Collection;
  userId: number;
  viewRights: boolean;
  editRights: boolean;
};
