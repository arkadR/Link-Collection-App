import { Collection } from "./Collection";

export type SharedCollection = {
  collectionId: number;
  collection: Collection;
  userId: number;
  viewRights: boolean;
  editRights: boolean;
};

export type SharedCollectionData = {
  collectionId: number;
  userId: string;
  viewRights: boolean;
  editRights: boolean;
};
