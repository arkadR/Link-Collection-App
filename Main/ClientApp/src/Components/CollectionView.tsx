import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Message from "../Components/Common/Message";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";
import Center from "./Common/Center";

type CollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function CollectionView(props: CollectionViewProps) {
  const collectionId = props.match.params.collectionId;
  let [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    setCollection(CollectionsStore.getCollection(collectionId));
    const changeHandler = () => {
      setCollection(CollectionsStore.getCollection(collectionId));
    };

    console.debug({ col: collection });

    CollectionsStore.addChangeListener(changeHandler);
    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.match.params.collectionId]);

  return (
    <Center>
      <>
        {collection?.element.map(element => (
          <a href={element.link}>{element.link}</a>
        ))}
      </>
    </Center>
  );
}
