import { Element } from "./Element";

export type Collection = {
  id: number;
  isPublic: boolean;
  ownerId: string;
  name: string;
  description: string;
  createdDate: Date;
  elements: Element[];
};

export type CollectionCreationData = {
  isPublic: boolean;
  name: string;
  description: string;
};

export type CollectionUpdateData = {
  name: string;
  description: string;
};
