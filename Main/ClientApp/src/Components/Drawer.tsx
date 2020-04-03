import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { List, Drawer as MaterialDrawer } from "@material-ui/core";
import { Lock, Widgets, People, Save } from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../Stores/CollectionsStore";
import { Link } from "react-router-dom";
import ListItemAdd from "./ListItemAdd";
import AddCollectionDialog from "./Dialogs/AddCollectionDialog";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    link: {
      color: "black",
      textDecoration: "none"
    },
    addItem: {
      paddingLeft: "15px"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

export default function Drawer() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleAddComponentDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

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

  return (
    <MaterialDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <DrawerItem
          title="My collections"
          icon={<Widgets />}
          nestedList={
            <List component="div" disablePadding>
              {collections.map(collection => (
                <Link
                  to={`/collections/${collection.id}`}
                  className={classes.link}
                >
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
        <DrawerItem
          title="Shared with me"
          icon={<People />}
          nestedList={<List component="div" disablePadding></List>}
        />
        <DrawerItem
          title="Saved"
          icon={<Save />}
          nestedList={<List component="div" disablePadding></List>}
        />
      </List>
    </MaterialDrawer>
  );
}
