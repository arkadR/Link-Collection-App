import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";
import ElementCreator from "./ElementCreator";
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
        <GridListTile key={element.id}>
          <ElementCreator element={element} />
        </GridListTile>
      ))}
    </GridList>
  );
}
