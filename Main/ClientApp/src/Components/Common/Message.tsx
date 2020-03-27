import React from "react";
import { Typography } from "@material-ui/core";
import Center from "./Center";

type MessageProps = {
  text: string;
};

export default function Message(props: MessageProps) {
  return (
    <Center>
      <Typography variant="h3" align="center" style={{ color: "grey" }}>
        {props.text}
      </Typography>
    </Center>
  );
}
