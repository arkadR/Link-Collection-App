import React, { ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar as MaterialAppBar
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function AppBar(props: AppBarProps) {
  const classes = useStyles();

  return (
    <MaterialAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        {props.rightSideMenu}
      </Toolbar>
    </MaterialAppBar>
  );
}

type AppBarProps = {
  title: string;
  rightSideMenu: ReactNode;
};
