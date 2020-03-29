import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { List, Drawer as MaterialDrawer } from "@material-ui/core";
import { Lock, Widgets, People, Save } from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";
import CollectionsStore from "../Stores/CollectionsStore";
import { loadCollections } from "../Actions/Actions";
import { Link } from "react-router-dom";

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

export default function Drawer() {
  const classes = useStyles();

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
            </List>
          }
        />
        <DrawerItem
          title="Shared with me"
          icon={<People />}
          nestedList={
            <List component="div" disablePadding>
              {/* {collections.map(collection => (
                <DrawerItemNested title={collection.Name} />
              ))} */}
            </List>
          }
        />
        <DrawerItem
          title="Saved"
          icon={<Save />}
          nestedList={
            <List component="div" disablePadding>
              {/* {collections.map(collection => (
                <DrawerItemNested title={collection.Name} />
              ))} */}
            </List>
          }
        />
      </List>
    </MaterialDrawer>
  );
}
