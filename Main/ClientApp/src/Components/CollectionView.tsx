import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AddElementDialog from "./Dialogs/AddElementDialog";
import BaseCollectionView from "./BaseCollectionView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

type CollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function CollectionView(props: CollectionViewProps) {
  const classes = useStyles();
  let [collection, setCollection] = useState<Collection | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleAddElementDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
    const collectionId = props.match.params.collectionId;
    setCollection(CollectionsStore.getCollection(collectionId));
    const changeHandler = () => {
      setCollection(CollectionsStore.getCollection(collectionId));
    };

    CollectionsStore.addChangeListener(changeHandler);
    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.match.params.collectionId]);

  return (
    <>
      <BaseCollectionView collection={collection} />
      <AddElementDialog
        toggleDialogOpen={toggleAddElementDialogOpen}
        open={dialogOpen}
        collectionId={props.match.params.collectionId}
      />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={toggleAddElementDialogOpen}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
