import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardHeader, Avatar, CardContent } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { GetHostnameLink, GetProperUrl } from "../Infrastructure/UrlUtilities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px",

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
  const classes = useStyles();

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

  let onCardClick = () => {
    let link = document.getElementById(elementUrl);
    link?.click();
  };

  return (
    <>
      <a
        id={elementUrl}
        href={elementUrl}
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
      />
      <Card className={classes.root} elevation={3} onClick={onCardClick}>
        <CardHeader
          avatar={<Avatar alt="Thumbnail" src={faviconUrl} />}
          title={displayedName}
          subheader={elementUrl}
          action={
            <IconButton
              aria-label="settings"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MoreVert />
            </IconButton>
          }
        />
        {props.children ? <CardContent>{props.children}</CardContent> : <></>}
      </Card>
    </>
  );
}
