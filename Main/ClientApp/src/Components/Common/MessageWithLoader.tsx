import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Loader from "react-loader-spinner";
import Center from "./Center";

type MessageWithLoaderProps = {
  text: string;
};

export default function MessageWithLoader(props: MessageWithLoaderProps) {
  return (
    <Center>
      <Grid
        container
        justify="center"
        //   alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h3" align="center" style={{ color: "grey" }}>
            {props.text}
          </Typography>
        </Grid>
        <Grid item>
          <Loader type="TailSpin" color="grey" height={60} width={60} />
        </Grid>
      </Grid>
    </Center>
  );
}
