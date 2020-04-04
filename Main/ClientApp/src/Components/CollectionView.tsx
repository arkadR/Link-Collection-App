import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";
import ElementCreator from "./ElementCreator";
import { GridList, GridListTile, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AddElementDialog from "./Dialogs/AddElementDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: "25px 30px 25px 30px"
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
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
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleAddElementDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
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
      <GridList
        cols={3}
        cellHeight="auto"
        spacing={50}
        className={classes.list}
      >
        {collection?.elements.map(element => (
          <GridListTile key={element.id}>
            <ElementCreator element={element} />
          </GridListTile>
        ))}
      </GridList>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={toggleAddElementDialogOpen}
      >
        <AddIcon />
      </Fab>
      <AddElementDialog
        toggleDialogOpen={toggleAddElementDialogOpen}
        open={dialogOpen}
        collectionId={props.match.params.collectionId}
      />
    </>
  );
}
