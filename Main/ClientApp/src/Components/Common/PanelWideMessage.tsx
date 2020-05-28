import React, { ReactNode } from "react";
import { Grid, Typography } from "@material-ui/core";
import Loader from "react-loader-spinner";
import Center from "./Center";

type PanelWideMessageProps = {
  text: string;
  withThrobber?: boolean;
  children?: ReactNode;
};

export default function PanelWideMessage(props: PanelWideMessageProps) {
  return (
    <Center>
      <Grid style={{ width: "100%" }} container justify="center" spacing={2}>
        <Grid item>
          <Typography variant="h3" style={{ color: "grey" }}>
            {props.text}
          </Typography>
        </Grid>
        {props.withThrobber === true && (
          <Grid item>
            <Loader type="TailSpin" color="grey" height={60} width={60} />
          </Grid>
        )}
      </Grid>
      <div style={{ marginTop: 40 }}>{props.children}</div>
    </Center>
  );
}
