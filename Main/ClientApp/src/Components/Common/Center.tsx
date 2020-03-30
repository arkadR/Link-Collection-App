import React, { ReactNode } from "react";
import { Grid } from "@material-ui/core";

type CenterProps = {
  children: ReactNode;
};

export default function Center(props: CenterProps) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      {props.children}
    </Grid>
  );
}
