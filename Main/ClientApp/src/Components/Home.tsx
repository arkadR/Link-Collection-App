import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Center from "./Center";

export default function Home() {
  return (
    <Center>
      <Typography variant="h3" align="center" style={{ color: "grey" }}>
        Select a collection to display
      </Typography>
    </Center>
  );
}
