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
  let [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      let collection = await CollectionsApi.getPublicCollection(
        props.match.params.collectionId
      );
      setCollection(collection);
      setIsLoaded(true);
    }
    loadData();
    return () => {};
  }, [props.match.params.collectionId]);

  //TODO: Refactor, this is unreadable
  return isLoaded === false ? (
    <PanelWideMessage withThrobber text="Please wait..." />
  ) : collection === null ? (
    <PanelWideMessage text="Collection doesn't exists or is private" />
  ) : (
    <BaseCollectionView collection={collection} />
  );
}
