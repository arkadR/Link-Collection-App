export type Element = {
  id: number;
  collectionId: number;
  ownerId: string;
  link: string;
  name: string;
  description: string;
  sequence: number | null;
};

export type ElementCreationData = {
  collectionId: number;
  link: string;
  name: string;
};

export type ElementUpdateData = {
  link: string;
  name: string;
};
