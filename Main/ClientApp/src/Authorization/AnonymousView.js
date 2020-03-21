import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";

export default function AnonymousView(props) {
  return (
    <Grid
      style={{ width: 200 }}
      container
      direction="row"
      justify="flex-end"
      spacing={2}
    >
      <Grid item>
        <NavLink
          tag={Link}
          to={props.registerPath}
          style={{ color: "white", textDecoration: "none" }}
          // activeStyle={{ color: "red", textDecoration: "none" }}
        >
          REGISTER
        </NavLink>
      </Grid>
      <Grid item>
        <NavLink
          tag={Link}
          to={props.loginPath}
          style={{ color: "white", textDecoration: "none" }}
          // activeStyle={{ color: "red", textDecoration: "none" }}
        >
          LOGIN
        </NavLink>
      </Grid>
    </Grid>
  );
}
