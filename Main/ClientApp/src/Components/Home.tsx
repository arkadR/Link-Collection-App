import React from "react";
import { Typography } from "@material-ui/core";
import Center from "./Common/Center";

export default function Home() {
  return (
    <Center>
      <Typography variant="h3" align="center" style={{ color: "grey" }}>
        Select a collection to display
      </Typography>
    </Center>
  );
}
