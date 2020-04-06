import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { Lock, Widgets } from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../../Stores/CollectionsStore";
import { Link } from "react-router-dom";
import ListItemAdd from "../ListItemAdd";
import AddCollectionDialog from "../Dialogs/AddCollectionDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "black",
      textDecoration: "none"
    },
    addItem: {
      paddingLeft: "15px"
    }
  })
);

export default function MyCollectionsSection() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [collections, setCollections] = useState(
    CollectionsStore.getCollections()
  );

  useEffect(() => {
    const changeHandler = () => {
      setCollections(CollectionsStore.getCollections());
    };
    CollectionsStore.addChangeListener(changeHandler);

    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  });

  const toggleAddComponentDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <DrawerItem
      title="My collections"
      icon={<Widgets />}
      nestedList={
        <List component="div" disablePadding>
          {collections.map(collection => (
            <Link to={`/collections/${collection.id}`} className={classes.link}>
              <DrawerItemNested title={collection.name} icon={<Lock />} />
            </Link>
          ))}
          <ListItemAdd
            onClickHandler={() => {
              toggleAddComponentDialogOpen();
            }}
            text="Add collection"
            className={classes.addItem}
          />
          <AddCollectionDialog
            open={dialogOpen}
            toggleDialogOpen={toggleAddComponentDialogOpen}
          />
        </List>
      }
    />
  );
}
