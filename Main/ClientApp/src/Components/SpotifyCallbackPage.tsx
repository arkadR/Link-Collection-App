import React from "react";
import { Redirect } from "react-router-dom";
import { UrlHash } from "../Infrastructure/UrlUtilities";
import { setSpotifyUserToken } from "../Actions/SpotifyActions";

export default function SpotifyCallbackPage() {
  const hash = window.location.hash;
  let params = UrlHash(hash);
  setSpotifyUserToken(params.get("access_token"));
  return <Redirect to={"/collections"} />;
}
