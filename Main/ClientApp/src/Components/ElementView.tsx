import React, { ReactNode, useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Element } from "../Model/Element";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { GetHostnameLink, GetProperUrl } from "../Infrastructure/UrlUtilities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "rgba(34, 35, 78, 0.05)",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
    icon: {
      zoom: 2,
      maxHeight: "20px",
      maxWidth: "20px",
    },
  })
);

type ElementViewProps = {
  element: Element;
  children?: ReactNode;
};

export default function ElementView(props: ElementViewProps) {
  const [elementUrl, setElementUrl] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  useEffect(() => {
    let url = props.element.link;
    let name = props.element.name;
    setElementUrl(GetProperUrl(url));
    setDisplayedName(name.length === 0 ? url : name);
    setFaviconUrl(GetHostnameLink(url) + "/favicon.ico");
  }, [props.element]);

  const classes = useStyles();
  return (
    <Card raised className={classes.card}>
      <a href={elementUrl} className={classes.link}>
        <ListItem>
          <ListItemIcon>
            <img src={faviconUrl} className={classes.icon} alt={"Thumbnail"} />
          </ListItemIcon>
          <ListItemText primary={displayedName} />
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </ListItem>
      </a>
      {props.children}
    </Card>
  );
}
