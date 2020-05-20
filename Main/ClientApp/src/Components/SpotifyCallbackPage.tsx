import React from "react";
import { Redirect } from "react-router-dom";
import { UrlHash } from "../Infrastructure/UrlUtilities";
import Cookies from "js-cookie";
import { useCookie } from "../Infrastructure/CustomReactHooks";

export default function SpotifyCallbackPage() {
  const hash = window.location.hash;
  let params = UrlHash(hash);

  Cookies.set("spotifyUserToken", JSON.stringify(params.get("access_token")));
  let [collectionId, _] = useCookie<number | null>(
    "spotifyRediretCollectionId",
    null
  );
  return <Redirect to={"/collections/" + collectionId} />;
}
