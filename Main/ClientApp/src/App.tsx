import React from "react";
import "./App.css";
import DrawerAppBar from "./shared/components/DrawerAppBar";
import { Typography, Grid } from "@material-ui/core";

function App() {
  return (
    <div>
      <DrawerAppBar
        content={
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "80vh" }}
          >
            <Typography variant="h3" align="center" style={{ color: "grey" }}>
              Select collection to display
            </Typography>
          </Grid>
        }
      />
    </div>
  );
}

export default App;
