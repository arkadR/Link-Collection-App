import React, { useState, useEffect } from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { AddToQueue } from "@material-ui/icons";
import SpotifyLoginDialog from "./Dialogs/SpotifyLoginDialog";
import { GetHostnameLink } from "../Infrastructure/UrlUtilities";

type SpotifyElementProps = {
  element: Element;
};

export default function SpotifyElement(props: SpotifyElementProps) {
  const [spotifyLoginDialogOpen, setSpotifyLoginDialogOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <ElementView element={props.element}>
        <IconButton
          aria-label="AddToQueue"
          onClick={(e) => {
            e.stopPropagation();
            if (!loggedIn) setSpotifyLoginDialogOpen(true);
            //TODO:else -> add to queue
          }}
        >
          <AddToQueue />
        </IconButton>
      </ElementView>
      <SpotifyLoginDialog
        open={spotifyLoginDialogOpen}
        toggleDialogOpen={() =>
          setSpotifyLoginDialogOpen(!spotifyLoginDialogOpen)
        }
        redirectUri={"https://" + window.location.host + "/spotifycallback"}
      />
    </>
  );
}
