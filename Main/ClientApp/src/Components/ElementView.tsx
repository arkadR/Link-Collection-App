import React, { ReactNode } from "react";
import { Card } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Element } from "../Model/Element";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { GetHostnameLink } from "./LinkExtraxt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "rgba(34, 35, 78, 0.05)"
    },
    link: {
      color: "black",
      textDecoration: "none"
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
  children?: ReactNode;
};

export default function ElementView(props: ElementViewProps) {
  const classes = useStyles();
  return (
    <Card raised className={classes.card}>
      <a href={props.element.link} className={classes.link}>
        <ListItem>
          <ListItemIcon>
            <img
              src={GetHostnameLink(props.element.link) + "/favicon.ico"}
              className={classes.icon}
            />
          </ListItemIcon>
          <ListItemText primary={props.element.name} />
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </ListItem>
      </a>
      {props.children}
    </Card>
  );
}
