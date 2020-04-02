import React from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      display: "block",
      margin: "auto",
      height: "auto",
      maxHeight: "100%",
      width: "auto",
      maxWidth: "100%"
    }
  })
);

type ImageElementProps = {
  element: Element;
};

export default function ImageElement(props: ImageElementProps) {
  const classes = useStyles();
  return (
    <ElementView element={props.element}>
      <img src={props.element.link} alt="" className={classes.image} />
    </ElementView>
  );
}
