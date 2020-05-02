import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import BaseCollectionView from "./BaseCollectionView";
import { Collection } from "../Model/Collection";
import CollectionsApi from "../Api/PublicCollectionsApi";
import PanelWideMessage from "./Common/PanelWideMessage";

type PublicCollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function PublicCollectionView(props: PublicCollectionViewProps) {
  let [collection, setCollection] = useState<Collection | null>(null);

  const getCollection = () => {
    let returnedCollection = CollectionsApi.getPublicCollection(
      props.match.params.collectionId
    );
    returnedCollection.then((c) => setCollection(c));
  };

  useEffect(() => {
    getCollection();
  }, [props.match.params.collectionId]);

  return collection === null ? (
    <PanelWideMessage text="Collection doesn't exists or is private" />
  ) : (
    <BaseCollectionView collection={collection} />
  );
}
