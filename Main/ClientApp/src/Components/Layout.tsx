import React, { ReactNode } from "react";
import AppBar from "./Common/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { LoginMenu } from "../Authorization/LoginMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

type LayoutPropTypes = {
  children: ReactNode;
};

export default function Layout(props: LayoutPropTypes) {
  const classes = useStyles();
  return (
    <div>
      <AppBar title={"Link App"} rightSideMenu={<LoginMenu />} />
      <div className={classes.toolbar} />
      {props.children}
    </div>
  );
}
