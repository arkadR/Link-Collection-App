import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button } from "@material-ui/core";
import { OpenLink } from "../../Infrastructure/UrlUtilities";
import Cookies from "js-cookie";

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
  const clientId = "e9a69171037d403ba8f18aa96d36aa09"; //TODO: get from server
  const scopes = ["user-modify-playback-state"];

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
              "spotifyRediretCollectionId",
              JSON.stringify(props.collectionId)
            );
            OpenLink(
              `${authEndpoint}?client_id=${clientId}&redirect_uri=${
                props.redirectUri
              }&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`
            );
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
