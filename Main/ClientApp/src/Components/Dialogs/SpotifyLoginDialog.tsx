import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import SpotifyStore from "../../Stores/SpotifyStore";

type SpotifyLoginDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  redirectUri: string;
  collectionId: number;
};

export default function SpotifyLoginDialog(props: SpotifyLoginDialogProps) {
  const title = "Login to Spotify";
  const description = "Login to spotify to add this song to queue";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const [clientId, setClientId] = useState<string | null>(
    SpotifyStore.getSpotifyClientId()
  );
  const scopes = ["user-modify-playback-state"];
  const spotifyRedirectUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${
    props.redirectUri
  }&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

  useEffect(() => {
    const clientIdChangeHandler = () => {
      setClientId(SpotifyStore.getSpotifyClientId());
    };
    SpotifyStore.addChangeListener(clientIdChangeHandler);
    return () => {
      SpotifyStore.removeChangeListener(clientIdChangeHandler);
    };
  }, []);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      actions={
        <Button
          onClick={() => {
            Cookies.set(
              "spotifyRedirectCollectionId",
              JSON.stringify(props.collectionId)
            );
            if (clientId !== null) window.location.replace(spotifyRedirectUrl);
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Login
        </Button>
      }
    />
  );
}
