import React from "react";
import ElementView from "./ElementView";
import Youtube, { Options } from "react-youtube";
import { Element } from "../Model/Element";
import { createStyles, Theme, makeStyles } from "@material-ui/core";

interface YoutubeElementProps {
  element: Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingBottom: "56.25%" /* 16:9 */,
      height: "0",
      position: "relative",
    },
    content: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
  })
);

export default function YoutubeElement(props: YoutubeElementProps) {
  const url = new URL(props.element.link);
  const videoId = url.searchParams.get("v")!;
  const classes = useStyles();

  const onReady = (event: { target: any }) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  } as Options;

  return (
    <ElementView element={props.element}>
      <div className={classes.root}>
        <Youtube
          className={classes.content}
          videoId={videoId}
          onReady={onReady}
          opts={opts}
        />
      </div>
    </ElementView>
  );
}
