import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar as MaterialAppBar,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

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
          Link App
        </Typography>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </MaterialAppBar>
  );
}

type AppBarProps = {
  children?: ReactElement;
};
