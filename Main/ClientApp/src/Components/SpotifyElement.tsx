import React, { useState, useEffect } from "react";
import ElementView from "./ElementView";
import { Element } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { VpnKey, Queue } from "@material-ui/icons";
import SpotifyLoginDialog from "./Dialogs/SpotifyLoginDialog";
import { addToQueue, getTrackInfo } from "../Actions/SpotifyActions";
import Cookies from "js-cookie";
import SpotifyStore from "../Stores/SpotifyStore";
import { CardHeader, Avatar } from "@material-ui/core";
import UsersStore from "../Stores/UsersStore";

type SpotifyElementProps = {
  element: Element;
};

type SpotifyTokenCookie = {
  spotifyToken: string;
  userId: string;
};

export default function SpotifyElement(props: SpotifyElementProps) {
  const [currentUser, setCurrentUser] = useState(UsersStore.getCurrentUser());
  const [spotifyLoginDialogOpen, setSpotifyLoginDialogOpen] = useState(false);
  let spotifyCookie = Cookies.getJSON(
    "spotifyUserToken"
  ) as SpotifyTokenCookie | null;
  let userToken =
    currentUser?.id === spotifyCookie?.userId
      ? spotifyCookie?.spotifyToken
      : null;
  let trackId = getTrackId(props.element.link);
  let trackUri = "spotify:track:" + trackId;
  let [track, setTrack] = useState<SpotifyApi.SingleTrackResponse | undefined>(
    SpotifyStore.getTrack(trackId)
  );

  useEffect(() => {
    const trackChangeHandler = () => {
      setTrack(SpotifyStore.getTrack(trackId));
    };
    const userChangeHandler = () => {
      setCurrentUser(UsersStore.getCurrentUser());
    };
    SpotifyStore.addChangeListener(trackChangeHandler);
    UsersStore.addChangeListener(userChangeHandler);

    if (track === undefined && userToken !== null) {
      getTrackInfo(trackId, userToken!);
    }

    return () => {
      SpotifyStore.removeChangeListener(trackChangeHandler);
      UsersStore.removeChangeListener(userChangeHandler);
    };
  }, [trackId, userToken, track]);

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
