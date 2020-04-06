import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { List, Drawer as MaterialDrawer } from "@material-ui/core";
import MyCollectionsSection from "./MyCollectionsSection";
import SharedSection from "./SharedSection";
import SavedSection from "./SavedSection";

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

export default function Drawer() {
  const classes = useStyles();

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
        <MyCollectionsSection />
        <SharedSection />
        <SavedSection />
      </List>
    </MaterialDrawer>
  );
}
