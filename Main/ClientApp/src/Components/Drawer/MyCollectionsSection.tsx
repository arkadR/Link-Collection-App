import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
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
import SharedCollectionsStore from "../../Stores/SharedCollectionsStore";
import ListItemAdd from "../ListItemAdd";
import EditCollectionDialog from "../Dialogs/EditCollectionDialog";
import EditContributorDialog from "../Dialogs/EditContributorDialog";
import ShareCollectionDialog from "../Dialogs/ShareCollectionDialog";
import AddCollectionDialog from "../Dialogs/AddCollectionDialog";
import { Collection } from "../../Model/Collection";
import { SharedCollection } from "../../Model/SharedCollection";
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
  const [
    contributorsSharedCollections,
    setContributorsSharedCollections,
  ] = useState<SharedCollection[] | null>(
    SharedCollectionsStore.getCollectionsSharedCollections()
  );
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollection] = useState(-1);
  const [makePublicDialogOpen, setMakePublicDialogOpen] = useState(false);
  const [
    makeEditContributorDialogOpen,
    setMakeEditContributorDialogOpen,
  ] = useState(false);
  const [selectedContributorId, setSelectedContributorId] = useState(-1);

  useEffect(() => {
    const collectionChangeHandler = () => {
      setCollections(CollectionsStore.getCollections());
    };
    const contributorsSCChangeHandler = () => {
      setContributorsSharedCollections(
        SharedCollectionsStore.getCollectionsSharedCollections()
      );
    };
    CollectionsStore.addChangeListener(collectionChangeHandler);
    SharedCollectionsStore.addChangeListener(contributorsSCChangeHandler);

    return () => {
      CollectionsStore.removeChangeListener(collectionChangeHandler);
      SharedCollectionsStore.removeChangeListener(contributorsSCChangeHandler);
    };
  }, []);

  const haveSharedCollections = (collectionId: number) => {
    let collectionSC = contributorsSharedCollections?.filter(
      (csc) => csc.collectionId === collectionId
    );
    if (collectionSC === undefined) return false;
    return collectionSC.length > 0;
  };

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

  const onEditContributorClick = (
    collectionId: number,
    contributorId: number
  ) => {
    setSelectedCollection(collectionId);
    setSelectedContributorId(contributorId);
    setMakeEditContributorDialogOpen(true);
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
                    {haveSharedCollections(collection.id) && <Divider />}
                    {contributorsSharedCollections
                      ?.filter((csc) => csc.collectionId === collection.id)
                      .map((sc) => (
                        <ListItem
                          onClick={() =>
                            onEditContributorClick(collection.id, sc.userId)
                          }
                          button
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <Person />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={sc.user.name} />
                        </ListItem>
                      ))}
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
      />
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
      <EditContributorDialog
        open={makeEditContributorDialogOpen}
        toggleDialogOpen={() =>
          setMakeEditContributorDialogOpen(!makeEditContributorDialogOpen)
        }
        collectionId={selectedCollectionId}
        userId={selectedContributorId}
      />
    </>
  );
}
