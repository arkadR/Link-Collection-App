import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Lock, Widgets, Public, GroupAdd } from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../../Stores/CollectionsStore";
import { Link } from "react-router-dom";
import ListItemAdd from "../ListItemAdd";
import AddCollectionDialog from "../Dialogs/AddCollectionDialog";
import ShareCollectionDialog from "../Dialogs/ShareCollectionDialog";
import { Collection } from "../../Model/Collection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "black",
      textDecoration: "none",
    },
    addItem: {
      paddingLeft: "15px",
    },
  })
);

export default function MyCollectionsSection() {
  const classes = useStyles();
  const [addCollectionDialogOpen, setDialogOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>(
    CollectionsStore.getCollections()
  );
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(-1);

  useEffect(() => {
    const changeHandler = () => {
      setCollections(CollectionsStore.getCollections());
    };
    CollectionsStore.addChangeListener(changeHandler);

    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  }, []);

  const toggleAddElementDialogOpen = () => {
    setDialogOpen(!addCollectionDialogOpen);
  };

  const onShareCollectionClick = (collectionId: number) => {
    setSelectedCollection(collectionId);
    setShareDialogOpen(true);
  };

  return (
    <>
      <DrawerItem
        title="My collections"
        icon={<Widgets />}
        nestedList={
          <List component="div" disablePadding>
            {collections?.map((collection) => (
              <Link
                to={`/collections/${collection.id}`}
                className={classes.link}
                key={collection.id}
              >
                <DrawerItemNested
                  title={collection.name}
                  icon={collection.isPublic ? <Public /> : <Lock />}
                  menuItems={
                    //<></>}
                    /*
                  // @ts-ignore */
                    <MenuItem
                      onClick={() => onShareCollectionClick(collection.id)}
                    >
                      <ListItem>
                        <ListItemIcon>
                          <GroupAdd />
                        </ListItemIcon>
                        <ListItemText primary="Share" />
                      </ListItem>
                    </MenuItem>
                  }
                />
              </Link>
            ))}
            <ListItemAdd
              onClickHandler={() => {
                toggleAddElementDialogOpen();
              }}
              text="Add collection"
              className={classes.addItem}
            />
            <AddCollectionDialog
              open={addCollectionDialogOpen}
              toggleDialogOpen={toggleAddElementDialogOpen}
            />
          </List>
        }
      />
      <ShareCollectionDialog
        open={shareDialogOpen}
        toggleDialogOpen={() => setShareDialogOpen(!shareDialogOpen)}
        collectionId={selectedCollection}
      ></ShareCollectionDialog>
    </>
  );
}
