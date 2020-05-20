import React from "react";
import ElementView from "./ElementView";
import Youtube, { Options } from "react-youtube";
import { Element } from "../Model/Element";
import { createStyles, Theme, makeStyles } from "@material-ui/core";

const youtubeVideoIdRegex = /(?:youtube.)\w+(?:\/watch?)\?v=(\w+)/;

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
  const classes = useStyles();

  const match = props.element.link.match(youtubeVideoIdRegex);
  const videoId = match?.[1] ?? null;
  const onReady = (event: { target: any }) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  } as Options;

  return (
    <ElementView element={props.element}>
      {videoId && (
        <div className={classes.root}>
          <Youtube
            className={classes.content}
            videoId={videoId}
            onReady={onReady}
            opts={opts}
          />
        </div>
      )}
    </ElementView>
  );
}
