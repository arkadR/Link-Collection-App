import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar as MaterialAppBar,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { LoginMenu } from "../Authorization/LoginMenu";

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
        <LoginMenu></LoginMenu>
        <Link to="/authentication/login">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Link>
      </Toolbar>
    </MaterialAppBar>
  );
}

type AppBarProps = {
  children?: ReactElement;
};
