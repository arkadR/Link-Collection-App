import React from "react";
import { Grid } from "@material-ui/core";
import Loader from "react-loader-spinner";

type LoaderSpinnerProps = {
  text: string;
};

export default function LoaderSpinner(props: LoaderSpinnerProps) {
  return (
    <Grid
      container
      justify="center"
      //   alignItems="center"
      spacing={2}
    >
      <Grid item>{props.text}</Grid>
      <Grid item>
        <Loader type="TailSpin" color="grey" height={30} width={30} />
      </Grid>
    </Grid>
  );
}
