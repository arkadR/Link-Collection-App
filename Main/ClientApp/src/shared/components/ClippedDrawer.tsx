import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { List, Drawer } from "@material-ui/core";
import { Lock, Widgets, People, Save } from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";

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

export default function CilppedDrawer() {
  const classes = useStyles();
  //TODO: get data
  var testData = ["Mallorca", "Iss", "PWR"];

  return (
    <Drawer
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
              {testData.map((text, index) => (
                <DrawerItemNested title={text} icon={<Lock />} />
              ))}
            </List>
          }
        />
        <DrawerItem
          title="Shared with me"
          icon={<People />}
          nestedList={
            <List component="div" disablePadding>
              {testData.map((text, index) => (
                <DrawerItemNested title={text} />
              ))}
            </List>
          }
        />
        <DrawerItem
          title="Saved"
          icon={<Save />}
          nestedList={
            <List component="div" disablePadding>
              {testData.map((text, index) => (
                <DrawerItemNested title={text} />
              ))}
            </List>
          }
        />
      </List>
    </Drawer>
  );
}
