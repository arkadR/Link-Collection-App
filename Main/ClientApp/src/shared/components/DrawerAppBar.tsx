import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LoginAppBar from "./LoginAppBar";
import ClippedDrawer from "./ClippedDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

type DrawerAppBarProps = {
  content?: ReactElement;
};

export default function DrawerAppBar({ content }: DrawerAppBarProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LoginAppBar />
      <ClippedDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {content}
      </main>
    </div>
  );
}
