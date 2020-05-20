import React, { useState } from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";
import SpotifyLoginDialog from "./Dialogs/SpotifyLoginDialog";

type SpotifyElementProps = {
  element: Element;
};

export default function SpotifyElement(props: SpotifyElementProps) {
  const [spotifyLoginDialogOpen, setSpotifyLoginDialogOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn && (
        <>
          <ElementView element={props.element}>
            <IconButton
              aria-label="AddToQueue"
              onClick={(e) => {
                e.stopPropagation();
                setSpotifyLoginDialogOpen(true);
              }}
            >
              <VpnKey />
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
      )}
      {/* //TODO:else -> add to queue */}
    </>
  );
}
