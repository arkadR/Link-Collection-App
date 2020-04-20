import React, { ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "./Drawer/Drawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

type ContentWithDrawerProps = {
  children: ReactNode;
};

export default function ContentWithDrawer(props: ContentWithDrawerProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer />
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
