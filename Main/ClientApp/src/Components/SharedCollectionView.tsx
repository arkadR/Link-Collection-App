import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SharedCollectionsStore from "../Stores/SharedCollectionsStore";
import { SharedCollection } from "../Model/SharedCollection";
import ElementCreator from "./ElementCreator";
import { GridList, GridListTile, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AddElementDialog from "./Dialogs/AddElementDialog";
import BaseCollectionView from "./BaseCollectionView";
import PanelWideMessage from "./Common/PanelWideMessage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

type SharedCollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function SharedCollectionView(props: SharedCollectionViewProps) {
  const classes = useStyles();
  const collectionId = props.match.params.collectionId;
  let [
    sharedCollection,
    setSharedCollection
  ] = useState<SharedCollection | null>(null);

  useEffect(() => {
    setSharedCollection(
      SharedCollectionsStore.getSharedCollection(collectionId)
    );
    const changeHandler = () => {
      setSharedCollection(
        SharedCollectionsStore.getSharedCollection(collectionId)
      );
    };

    SharedCollectionsStore.addChangeListener(changeHandler);
    return () => {
      SharedCollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.match.params.collectionId]);

  return (
    <>
      {sharedCollection?.viewRights ? (
        <BaseCollectionView collection={sharedCollection?.collection}>
          {sharedCollection?.editRights && (
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              // onClick={toggleAddElementDialogOpen}
            >
              <AddIcon />
            </Fab>
          )}
        </BaseCollectionView>
      ) : (
        <PanelWideMessage
          text="You have no rights to view this collection"
          throbber={false}
        />
      )}
    </>
  );
}
