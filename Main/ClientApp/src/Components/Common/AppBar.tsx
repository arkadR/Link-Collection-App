import React, { ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar as MaterialAppBar,
} from "@material-ui/core";
import Breadcrumbs from "../Breadcrumbs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    breadcrumbs: {
      flexGrow: 1,
      marginLeft: "140px",
    },
  })
);

type AppBarProps = {
  title: string;
  rightSideMenu: ReactNode;
};

export default function AppBar(props: AppBarProps) {
  const classes = useStyles();

  return (
    <MaterialAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{props.title}</Typography>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs />
        </div>
        {props.rightSideMenu}
      </Toolbar>
    </MaterialAppBar>
  );
}
