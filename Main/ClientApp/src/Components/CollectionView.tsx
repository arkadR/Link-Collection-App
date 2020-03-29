import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";
import ElementView from "./ElementView";
import { GridList, GridListTile } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: "25px 30px 25px 30px"
    }
  })
);

type CollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

const canRenderExtra = (url: string) => {
  // let regexp : RegExp = /\.(jpeg|jpg|gif|png)$/;
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

const dumbCheck = (id: number) => {
  return id === 1;
};

export default function CollectionView(props: CollectionViewProps) {
  const classes = useStyles();
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
    <GridList cols={3} cellHeight="auto" spacing={50} className={classes.list}>
      {collection?.element.map(element => (
        <GridListTile
          key={element.id}
          rows={canRenderExtra(element.link) ? 2 : 1} //z jakiegoś powodu nie chce działać
        >
          <ElementView element={element} />
        </GridListTile>
      ))}
    </GridList>
  );
}
