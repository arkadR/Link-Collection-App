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
  Delete,
  Edit,
  LockOpen,
  Equalizer,
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
import { Link, useRouteMatch } from "react-router-dom";

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
    contributorsOfSharedCollections,
    setContributorsOfSharedCollections,
  ] = useState<SharedCollection[] | null>(
    SharedCollectionsStore.getSharedCollectionsRelatedToCollections()
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
  const [selectedContributorId, setSelectedContributorId] = useState("");
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const collectionChangeHandler = () => {
      setCollections(CollectionsStore.getCollections());
    };
    const contributorsOfSharedCollectionsChangeHandler = () => {
      setContributorsOfSharedCollections(
        SharedCollectionsStore.getSharedCollectionsRelatedToCollections()
      );
    };
    CollectionsStore.addChangeListener(collectionChangeHandler);
    SharedCollectionsStore.addChangeListener(
      contributorsOfSharedCollectionsChangeHandler
    );

    return () => {
      CollectionsStore.removeChangeListener(collectionChangeHandler);
      SharedCollectionsStore.removeChangeListener(
        contributorsOfSharedCollectionsChangeHandler
      );
    };
  }, []);

  const hasSharedCollections = (collectionId: number) => {
    return (
      contributorsOfSharedCollections?.find(
        (csc) => csc.collectionId === collectionId
      ) !== undefined
    );
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
    contributorId: string
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

                    {collection.isPublic && (
                      <Link
                        to={`${url}/${collection.id}/stats`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <ListItem button>
                          <ListItemIcon>
                            <Equalizer />
                          </ListItemIcon>
                          <ListItemText primary="Stats" />
                        </ListItem>
                      </Link>
                    )}

                    {/* TODO: make private listitem */}
                    <ListItem
                      onClick={() => onShareCollectionClick(collection.id)}
                      button
                    >
                      <ListItemIcon>
                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary="Share" />
                    </ListItem>
                    {hasSharedCollections(collection.id) && <Divider />}
                    {contributorsOfSharedCollections
                      ?.filter((csc) => csc.collectionId === collection.id)
                      .map((sc) => (
                        <ListItem
                          key={sc.userId}
                          onClick={() =>
                            onEditContributorClick(collection.id, sc.userId)
                          }
                          button
                        >
                          <ListItemAvatar>
                            <Avatar>
                              {sc.user.name.toUpperCase().charAt(0)}
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
