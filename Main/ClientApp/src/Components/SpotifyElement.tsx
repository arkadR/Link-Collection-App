import React, { useState, useEffect } from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { VpnKey, Queue } from "@material-ui/icons";
import SpotifyLoginDialog from "./Dialogs/SpotifyLoginDialog";
import { addToQueue, getTrackInfo } from "../Actions/SpotifyActions";
import { useCookie } from "../Infrastructure/CustomReactHooks";
import SpotifyStore from "../Stores/SpotifyStore";
import { CardHeader, Avatar } from "@material-ui/core";

type SpotifyElementProps = {
  element: Element;
};

export default function SpotifyElement(props: SpotifyElementProps) {
  const [spotifyLoginDialogOpen, setSpotifyLoginDialogOpen] = useState(false);
  let [userToken, _] = useCookie<string | null>("spotifyUserToken", null);
  let trackId = getTrackId(props.element.link);
  let trackUri = "spotify:track:" + trackId;
  let [track, setTrack] = useState<SpotifyApi.SingleTrackResponse | undefined>(
    SpotifyStore.getTrack(trackId)
  );

  useEffect(() => {
    if (track === undefined && userToken !== null) {
      getTrackInfo(trackId, userToken!);
    }
    const collectionChangeHandler = () => {
      setTrack(SpotifyStore.getTrack(trackId));
    };
    SpotifyStore.addChangeListener(collectionChangeHandler);

    return () => {
      SpotifyStore.removeChangeListener(collectionChangeHandler);
    };
  }, [props.element.link]);

  return (
    <>
      <ElementView element={props.element}>
        {userToken !== null ? (
          <>
            {track !== undefined ? (
              <CardHeader
                avatar={
                  <Avatar src={track.album.images[0].url} variant="square" />
                }
                title={track.name}
                subheader={track.artists[0].name}
                action={
                  <IconButton
                    aria-label="AddToQueue"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToQueue(trackUri, userToken!);
                    }}
                  >
                    <Queue />
                  </IconButton>
                  // IDEA: like track
                }
              />
            ) : (
              <IconButton
                aria-label="AddToQueue"
                onClick={(e) => {
                  e.stopPropagation();
                  addToQueue(trackUri, userToken!);
                }}
              >
                <Queue />
              </IconButton>
            )}
          </>
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

function getTrackId(rawUrl: string): string {
  let cuttedTrackId = rawUrl.match(/(track(\/|:)[a-zA-Z0-9]+)/);
  let trackId = cuttedTrackId![0].match(/(\/|:)([a-zA-Z0-9]+)/);
  return trackId![2];
}
