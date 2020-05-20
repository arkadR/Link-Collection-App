import React, { useState, useEffect } from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { VpnKey, AddToQueue } from "@material-ui/icons";
import SpotifyLoginDialog from "./Dialogs/SpotifyLoginDialog";
import { addToQueue } from "../Actions/SpotifyActions";
import { useCookie } from "../Infrastructure/CustomReactHooks";

type SpotifyElementProps = {
  element: Element;
};

export default function SpotifyElement(props: SpotifyElementProps) {
  const [spotifyLoginDialogOpen, setSpotifyLoginDialogOpen] = useState(false);
  let [userToken, _] = useCookie<string | null>("spotifyUserToken", null);

  return (
    <>
      <ElementView element={props.element}>
        {userToken !== null ? (
          <IconButton
            aria-label="AddToQueue"
            onClick={(e) => {
              e.stopPropagation();
              addToQueue(getTrackUri(props.element.link), userToken!);
            }}
          >
            <AddToQueue />
          </IconButton>
        ) : (
          <IconButton
            aria-label="SpotifyLogin"
            onClick={(e) => {
              e.stopPropagation();
              setSpotifyLoginDialogOpen(true);
            }}
          >
            <VpnKey />
          </IconButton>
        )}
      </ElementView>
      <SpotifyLoginDialog
        open={spotifyLoginDialogOpen}
        toggleDialogOpen={() =>
          setSpotifyLoginDialogOpen(!spotifyLoginDialogOpen)
        }
        redirectUri={"https://" + window.location.host + "/spotifycallback"}
        collectionId={props.element.collectionId}
      />
    </>
  );
}

function getTrackUri(rawUrl: string): string {
  let cuttedTrackId = rawUrl.match(/(track(\/|:)[a-zA-Z0-9]+)/);
  let trackId = cuttedTrackId![0].match(/(\/|:)([a-zA-Z0-9]+)/);
  let result = "spotify:track:" + trackId![2];
  return result;
}
