import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Element } from "../Model/Element";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "rgba(34, 35, 78, 0.05)"
    },
    link: {
      color: "black",
      textDecoration: "none"
    },
    image: {
      display: "block",
      margin: "auto",
      height: "auto",
      maxHeight: "100%",
      width: "auto",
      maxWidth: "100%"
    },
    icon: {
      zoom: 2,
      maxHeight: "20px",
      maxWidth: "20px"
    }
  })
);

type ElementViewProps = {
  element: Element;
};

const getDomain = (url: string) => {
  let arr: string[] = url.split("/");
  return arr[0] + "//" + arr[2];
};

export default function ElementView(props: ElementViewProps) {
  const classes = useStyles();
  return (
    <Card raised className={classes.card}>
      <a href={props.element.link} className={classes.link}>
        <ListItem>
          <ListItemIcon>
            <img
              src={getDomain(props.element.link) + "/favicon.ico"}
              className={classes.icon}
            />
          </ListItemIcon>
          <ListItemText primary={props.element.name} />
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </ListItem>
      </a>
      <img src={props.element.link} alt="" className={classes.image} />
    </Card>
  );
}
