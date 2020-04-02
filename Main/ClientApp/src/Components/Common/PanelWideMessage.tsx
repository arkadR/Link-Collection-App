import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Loader from "react-loader-spinner";
import Center from "./Center";

type PanelWideMessageProps = {
  text: string;
  throbber: boolean;
};

export default function PanelWideMessage(props: PanelWideMessageProps) {
  return (
    <Center>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Typography variant="h3" align="center" style={{ color: "grey" }}>
            {props.text}
          </Typography>
        </Grid>
        {props.throbber && (
          <Grid item>
            <Loader type="TailSpin" color="grey" height={60} width={60} />
          </Grid>
        )}
      </Grid>
    </Center>
  );
}
