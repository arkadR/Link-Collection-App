import { Element } from "./Element";

export type Collection = {
  id: number;
  isPublic: boolean;
  ownerId: number;
  name: string;
  description: string;
  createdDate: Date;
  element: Element[];
};

export type CollectionCreationData = {
  isPublic: boolean;
  name: string;
};
