import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Home() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Typography variant="h3" align="center" style={{ color: "grey" }}>
        Select a collection to display
      </Typography>
    </Grid>
  );
}
