import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  Drawer as MaterialDrawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import MyCollectionsSection from "./MyCollectionsSection";
import SharedSection from "./SharedSection";
import SavedSection from "./SavedSection";
import UsersStore from "../../Stores/UsersStore";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

export default function Drawer() {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(UsersStore.getCurrentUser());

  useEffect(() => {
    const handler = () => {
      setCurrentUser(UsersStore.getCurrentUser());
    };
    UsersStore.addChangeListener(handler);
    return () => UsersStore.removeChangeListener(handler);
  }, []);

  const isAdmin =
    currentUser?.roles.find((role) => role === "Administrator") !== undefined ??
    false;

  return (
    <MaterialDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <MyCollectionsSection />
        <SharedSection />
        {/* <SavedSection /> */}
        {isAdmin && (
          <ListItem button component={Link} to="/admin">
            <ListItemIcon children={<SettingsIcon />} />
            <ListItemText primary="Admin panel" />
          </ListItem>
        )}
      </List>
    </MaterialDrawer>
  );
}
