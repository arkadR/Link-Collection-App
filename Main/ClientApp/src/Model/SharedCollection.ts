import { Collection } from "./Collection";

export type SharedCollection = {
  collectionId: number;
  collection: Collection;
  userId: number;
  editRights: boolean;
};

export type SharedCollectionData = {
  collectionId: number;
  userId: string;
  editRights: boolean;
};
