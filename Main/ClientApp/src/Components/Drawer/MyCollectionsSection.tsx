import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  Lock,
  Widgets,
  Public,
  GroupAdd,
  Delete,
  Edit,
  LockOpen,
} from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../../Stores/CollectionsStore";
import { Link } from "react-router-dom";
import ListItemAdd from "../ListItemAdd";
import EditCollectionDialog from "../Dialogs/EditCollectionDialog";
import ShareCollectionDialog from "../Dialogs/ShareCollectionDialog";
import AddCollectionDialog from "../Dialogs/AddCollectionDialog";
import { Collection } from "../../Model/Collection";
import { deleteCollection, updateCollection } from "../../Actions/Actions";
import DeleteCollectionDialog from "../Dialogs/DeleteCollectionDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "black",
      textDecoration: "none",
    },
    addItem: {
      paddingLeft: "15px",
    },
    collectionSettingsMenuTitle: {
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
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

  const onDeleteCollectionClick = (collectionId: number) => {
    setSelectedCollection(collectionId);
    setDeleteDialogOpen(true);
  };

  const onUpdateCollectionClick = (collectionId: number) => {
    setSelectedCollection(collectionId);
    setUpdateDialogOpen(true);
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
                    <>
                      <Typography
                        variant="h5"
                        className={classes.collectionSettingsMenuTitle}
                      >
                        Settings
                      </Typography>
                      <MenuItem
                        onClick={() => onDeleteCollectionClick(collection.id)}
                      >
                        <ListItem>
                          <ListItemIcon>
                            <Delete />
                          </ListItemIcon>
                          <ListItemText primary="Delete" />
                        </ListItem>
                      </MenuItem>
                      <MenuItem
                        onClick={() => onUpdateCollectionClick(collection.id)}
                      >
                        <ListItem>
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText primary="Edit" />
                        </ListItem>
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        {/* TODO: on click */}
                        <ListItem>
                          <ListItemIcon>
                            <LockOpen />
                          </ListItemIcon>
                          <ListItemText primary="Share with everyone" />
                        </ListItem>
                      </MenuItem>
                      {/* //<></>}
                    /*
                  // @ts-ignore */}
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
                      <Divider />
                      {/* TODO: list of contributors */}
                    </>
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
      <DeleteCollectionDialog
        open={deleteDialogOpen}
        toggleDialogOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
        confirmAction={() => deleteCollection(selectedCollection)}
      />
      <EditCollectionDialog
        open={updateDialogOpen}
        toggleDialogOpen={() => setUpdateDialogOpen(!updateDialogOpen)}
        collectionId={selectedCollection}
      />
    </>
  );
}
