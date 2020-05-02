import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
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
  Person,
  Delete,
  Edit,
  LockOpen,
} from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../../Stores/CollectionsStore";
import UsersStore from "../../Stores/UsersStore";
import ListItemAdd from "../ListItemAdd";
import EditCollectionDialog from "../Dialogs/EditCollectionDialog";
import ShareCollectionDialog from "../Dialogs/ShareCollectionDialog";
import AddCollectionDialog from "../Dialogs/AddCollectionDialog";
import { Collection } from "../../Model/Collection";
import { User } from "../../Model/User";
import DeleteCollectionDialog from "../Dialogs/DeleteCollectionDialog";
import MakePublicDialog from "../Dialogs/MakePublicDialog";

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
  const [contributors, setContributors] = useState<Map<number, User[]>>(
    UsersStore.getContributors()
  );
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollection] = useState(-1);
  const [makePublicDialogOpen, setMakePublicDialogOpen] = useState(false);

  useEffect(() => {
    const collectionChangeHandler = () => {
      setCollections(CollectionsStore.getCollections());
    };
    const contributorsChangeHandler = () => {
      setContributors(UsersStore.getContributors());
    };
    CollectionsStore.addChangeListener(collectionChangeHandler);
    UsersStore.addChangeListener(contributorsChangeHandler);

    return () => {
      CollectionsStore.removeChangeListener(collectionChangeHandler);
      UsersStore.removeChangeListener(contributorsChangeHandler);
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
    setEditDialogOpen(true);
  };

  const onMakeCollectionPublicClick = (collectionId: number) => {
    setSelectedCollection(collectionId);
    setMakePublicDialogOpen(true);
  };

  return (
    <>
      <DrawerItem
        title="My collections"
        icon={<Widgets />}
        nestedList={
          <List component="div" disablePadding>
            {collections?.map((collection) => (
              <DrawerItemNested
                key={collection.id}
                title={collection.name}
                icon={collection.isPublic ? <Public /> : <Lock />}
                link={`/collections/${collection.id}`}
                menuItems={
                  <div>
                    <Typography
                      variant="h5"
                      className={classes.collectionSettingsMenuTitle}
                    >
                      Settings
                    </Typography>
                    <ListItem
                      onClick={() => onDeleteCollectionClick(collection.id)}
                      button
                    >
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItem>
                    <ListItem
                      onClick={() => onUpdateCollectionClick(collection.id)}
                      button
                    >
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItem>
                    <Divider />
                    <ListItem
                      onClick={() => onMakeCollectionPublicClick(collection.id)}
                      button
                    >
                      <ListItemIcon>
                        <LockOpen />
                      </ListItemIcon>
                      <ListItemText primary="Get sharable link" />
                    </ListItem>
                    <ListItem
                      onClick={() => onShareCollectionClick(collection.id)}
                      button
                    >
                      <ListItemIcon>
                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary="Share" />
                    </ListItem>
                    <Divider />
                    {/* {console.log(JSON.stringify(contributors))} */}

                    {/* {
                      contributors.get(collection.id)?.forEach((u) => (
                        <ListItem
                          // onClick={() => onShareCollectionClick(collection.id)}
                          button
                        >
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <ListItemText primary={u.name} />
                        </ListItem>
                      ))
                    } */}
                  </div>
                }
              />
            ))}
            <ListItemAdd
              onClickHandler={() => {
                toggleAddElementDialogOpen();
              }}
              text="Add collection"
              className={classes.addItem}
            />
          </List>
        }
      />
      <AddCollectionDialog
        open={addCollectionDialogOpen}
        toggleDialogOpen={toggleAddElementDialogOpen}
      />
      <ShareCollectionDialog
        open={shareDialogOpen}
        toggleDialogOpen={() => setShareDialogOpen(!shareDialogOpen)}
        collectionId={selectedCollectionId}
      ></ShareCollectionDialog>
      <DeleteCollectionDialog
        open={deleteDialogOpen}
        toggleDialogOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
        collectionId={selectedCollectionId}
      />
      <EditCollectionDialog
        open={editDialogOpen}
        toggleDialogOpen={() => setEditDialogOpen(!editDialogOpen)}
        collectionId={selectedCollectionId}
      />
      <MakePublicDialog
        open={makePublicDialogOpen}
        toggleDialogOpen={() => setMakePublicDialogOpen(!makePublicDialogOpen)}
        collectionId={selectedCollectionId}
      />
    </>
  );
}
