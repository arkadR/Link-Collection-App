import { Collection } from "./Collection";

export type SharedCollection = {
  collectionId: number;
  collection: Collection;
  userId: string;
  viewRights: boolean;
  editRights: boolean;
};
